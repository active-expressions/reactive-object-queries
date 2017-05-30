import withLogging from '../../src/withlogging.js';
import select from '../../src/select.js';
import Person from '../fixtures/person.js';
import { proceed } from 'contextjs';

describe('.layer operators', function() {
    it('Person layer example', function() {

        withLogging.call(Person);

        var jenkinsName = 'Jenkins';
        var travisName = 'Travis';
        var jenkins = new Person(jenkinsName);
        var travis = new Person(travisName, Person.Dr);

        console.log(jenkins, travis);

        var drRefinement = {
            getName: function() {
                return Person.Dr + ' ';
            }
        };

        //TestLayer.beGlobal();
        var doctors = select(Person, function(p) {
            return p.title === Person.Dr;
        })
            .layer(drRefinement);

        expect(jenkins.getName()).to.equal(jenkinsName);
        expect(travis.getName()).to.equal(Person.Dr + ' ');
        console.log(travis.getName());
        travis.setTitle(Person.NoTitle);
        expect(travis.getName()).to.equal(travisName);
        console.log(travis.getName());

        var herukoName = 'Heruko';
        var heruko = new Person(herukoName, Person.Dr);

        console.log(heruko);
        expect(heruko.getName()).to.equal(Person.Dr + ' ');
    });

    it('IEEE Software Example', function() {

        class Array {
            constructor() {
                this.arr = [];
                this.initialize();
            }
            initialize() {}

            at(index) {
                return this.arr[index];
            }
            push(item) {
                let len = this.arr.length;
                this.arr[len] = item;
            }
            remove(index) {
                this.arr[index] = undefined;
            }
            includes(item) {
                let len = this.arr.length;
                let result = false;

                let i = 0;
                for(; i <= len; i++) {
                    if(this.arr[i] === item) {
                        result = true;
                    }
                }

                return result;
            }
            moveToOtherArray(target) {
                let len = this.arr.length;
                let i = 0;
                for(; i < len; i++) {
                    target.push(this.at(i));
                    this.remove(i);
                }
            }
        }

        class GraphicalElement {
            constructor() {
                this.children = new Array();
                this.persistentChildren = new Array();
                this.initialize();
            }
            initialize() {}

            addChild(c) {
                this.children.push(c);
                c.parent = this;

                return this;
            }
            persistChildren() {
                this.children.moveToOtherArray(this.persistentChildren);
            }
            unpersistChildren() {
                this.persistentChildren.moveToOtherArray(this.children);
            }
            hasParent(cb) {
                if(this.parent) {
                    if(cb(this.parent, this)) {
                        return true;
                    } else {
                        return this.parent.hasParent(cb);
                    }
                }
                return false;
            }
        }
        withLogging.call(GraphicalElement);

        class Stage extends GraphicalElement {
            onDrag() {
                return 'stage';
            }
        }

        class Circle extends GraphicalElement {
            onDrag() {
                return 'circle';
            }
        }

        class Rectangle extends GraphicalElement {
            onDrag() {
                return 'rectangle';
            }
        }

        class Text extends GraphicalElement {
            onDrag() {
                return 'text';
            }
        }

        let s = select(GraphicalElement, ge => ge.hasParent((parent, child) => parent.persistentChildren.includes(child)));
        s.layer({
            onDrag(event) {
                return proceed() + ' -> ' + this.parent.onDrag(event);
            }
        });

        let stage = new Stage();
        let group = new Rectangle();
        let rect = new Rectangle();
        let text = new Text();
        let circle = new Circle();

        stage.addChild(group);

        expect(rect.onDrag()).to.equal('rectangle');
        expect(text.onDrag()).to.equal('text');
        expect(circle.onDrag()).to.equal('circle');

        group.addChild(rect);
        rect.addChild(text);

        expect(rect.onDrag()).to.equal('rectangle');
        expect(text.onDrag()).to.equal('text');
        expect(circle.onDrag()).to.equal('circle');

        group.persistChildren();
        group.addChild(circle);

        expect(rect.onDrag()).to.equal('rectangle -> rectangle');
        expect(text.onDrag()).to.equal('text -> rectangle -> rectangle');
        expect(circle.onDrag()).to.equal('circle');

        group.unpersistChildren();

        expect(rect.onDrag()).to.equal('rectangle');
        expect(text.onDrag()).to.equal('text');
        expect(circle.onDrag()).to.equal('circle');

        group.persistChildren();

        expect(rect.onDrag()).to.equal('rectangle -> rectangle');
        expect(text.onDrag()).to.equal('text -> rectangle -> rectangle');
        expect(circle.onDrag()).to.equal('circle -> rectangle');
    });

    it('IEEE Software Example (Minified/Readable)', function() {

        class Array {
            constructor() {
                this.arr = [];
                this.initialize();
            }
            initialize() {}

            at(index) {
                return this.arr[index];
            }
            push(item) {
                let len = this.arr.length;
                this.arr[len] = item;
            }
            remove(index) {
                this.arr[index] = undefined;
            }
            includes(item) {
                let len = this.arr.length;
                let result = false;

                let i = 0;
                for(; i <= len; i++) {
                    if(this.arr[i] === item) {
                        result = true;
                    }
                }

                return result;
            }
            moveToOtherArray(target) {
                let len = this.arr.length;
                let i = 0;
                for(; i < len; i++) {
                    target.push(this.at(i));
                    this.remove(i);
                }
            }
        }

        class GraphicalElement {
            constructor() {
                this.children = new Array();
                this.persistentChildren = new Array();
                this.initialize();
            }
            initialize() {}

            addChild(c) {
                this.children.push(c);
                c.parent = this;

                return this;
            }
            persistChildren() {
                this.children.moveToOtherArray(this.persistentChildren);
            }
            unpersistChildren() {
                this.persistentChildren.moveToOtherArray(this.children);
            }
            hasParent(cb) {
                if(this.parent) {
                    if(cb(this.parent, this)) {
                        return true;
                    } else {
                        return this.parent.hasParent(cb);
                    }
                }
                return false;
            }
        }
        withLogging.call(GraphicalElement);

        class Stage extends GraphicalElement {
            onDrag() {
                return 'stage';
            }
        }

        class Circle extends GraphicalElement {
            onDrag() {
                return 'circle';
            }
        }

        class SideBar extends GraphicalElement {
            onDrag() {
                return 'sidebar';
            }
        }

        class Rectangle extends GraphicalElement {
            onDrag() {
                return 'rectangle';
            }
        }

        class Text extends GraphicalElement {
            onDrag() {
                return 'text';
            }
        }

        let stage = new Stage();
        let sidebar = new SideBar();
        stage.addChild(sidebar);

        // ### start actual example here? ###

        // define group using a reactive query
        let persistentChildren = select(GraphicalElement, ge => ge.hasParent((parent, child) => parent.persistentChildren.includes(child)));

        // adapt behavior of the group members
        persistentChildren.layer({
            onDrag(event) {
                return this.parent.onDrag(event); // delegate drag interactions to parent
            }
        });

        let rect = new Rectangle();
        let text = new Text();
        rect.addChild(text);

        sidebar.addChild(rect);

        // can drag text independently or the composition of text and rectangle
        expect(rect.onDrag()).to.equal('rectangle');
        expect(text.onDrag()).to.equal('text');

        // current children should hold their position
        sidebar.persistChildren();

        // thus, they delegate drag operations to their parent
        expect(rect.onDrag()).to.equal('sidebar'); // rect.onDrag(evt); // moves the whole sidebar
        expect(text.onDrag()).to.equal('sidebar'); // text.onDrag(evt); // same for nested children

        // adding a new circle to the sidebar
        let circle = new Circle();
        sidebar.addChild(circle);

        // can individually drag the circle as it is not persistent
        expect(circle.onDrag()).to.equal('circle'); // circle.onDrag(evt); // invokes unmodified behavior of the Circle class

        // ### maybe already stop here? ###

        // unpersisting all persistent children
        sidebar.unpersistChildren();

        // Thus all children move individually
        expect(rect.onDrag()).to.equal('rectangle');
        expect(text.onDrag()).to.equal('text');
        expect(circle.onDrag()).to.equal('circle');

        // persisting all children ...
        sidebar.persistChildren();

        // ... delegates dragging for all of them
        expect(rect.onDrag()).to.equal('sidebar');
        expect(text.onDrag()).to.equal('sidebar');
        expect(circle.onDrag()).to.equal('sidebar');
    });
});
