/*Imports*/
let Firebase = require("firebase");
let Rx = require("rx");



//TODO: Clean this mess up
let firebaseEndPoints = {
    topStories() { return new Firebase('https://hacker-news.firebaseio.com/v0/topstories') },
    singleStory(id) { return new Firebase('https://hacker-news.firebaseio.com/v0/item/' +id) }
}
let ts = firebaseEndPoints.topStories();
function firebaseStoryObservable(id) {
    let firebaseStory = firebaseEndPoints.singleStory(id);

    return Rx.Observable
        .fromEventPattern(
            (h) => firebaseStory.on('value', h),
            (h) => firebaseStory.off('value', h)
        )
        .map((data) => {
            return data.val();
        });
}

/*Internal Map*/
let stories = new Map();

/*Subejcts*/
let storySubject = new Rx.Subject();

/*Initalize Observerables, that will call the next() on subjects */
Rx.Observable
    .fromEventPattern(
        (h) => ts.on('value', h),
        (h) => ts.off('value', h)
    )
    .debounce(1000)
    .map((data) => data.val())
    .flatMapObserver((values) => Rx.Observable.from(values.slice(0,150)),
                        (e) => {
                            return Rx.Observable.just(1);
                        }
    )
    .filter((v) => {
        return !stories.has(v);
    })
    .doAction((id) => {
        stories.set(id, firebaseStoryObservable(id));
    })
        .throttle(2000)
        .flatMapLatest(() => { return [stories] })
        .subscribe((d) => storySubject.onNext(stories));

module.exports = {
    storySubject: storySubject
}