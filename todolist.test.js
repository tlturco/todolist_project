const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

// eslint-disable-next-line max-lines-per-function
describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo added to the list', ()  => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo added to the list', ()  => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes and returns the first item in the list', () => {
    expect(list.shift()).toEqual(todo1); //todo1 is returned
    expect(list.toArray()).toEqual([todo2, todo3]); //list is mutated
  });

  test('calling pop removes & returns the last item', () => {
    expect(list.pop()).toEqual(todo3); //todo3 is returned
    expect(list.toArray()).toEqual([todo1, todo2]); //list is mutated
  });

  test('calling isDone returns true when the list is done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('you cannot add items to the list that are not Todo objects', () => {
    expect(() => list.add({})).toThrow(TypeError);
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('string')).toThrow(TypeError);
    expect(() => list.add(new Todo('test'))).not.toThrow(TypeError);
  });

  test('itemAt() returns the item at a given index or raises a ReferenceError', () => {
    expect(list.itemAt(1)).toEqual(todo2); //existing index
    expect(() => list.itemAt(45)).toThrow(ReferenceError); //non-existing index
  });

  test('markDoneAt() marks a todo as done at a given index or returns a Reference Error', () => {
    list.markDoneAt(2);
    expect(todo1.isDone()).toEqual(false); //todo1 is unchanged
    expect(todo2.isDone()).toEqual(false); //todo2 is unchanged
    expect(todo3.isDone()).toEqual(true); //todo3 is done
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError); //trying to mark an index that doesn't exist will throw an error
  });

  test('markUnDoneAt() marks a todo as not done or returns a ReferenceError', () => {
    list.markAllDone(); //mark all done
    list.markUndoneAt(0); //undo mark1
    expect(todo1.isDone()).toEqual(false);
    expect(todo2.isDone()).toEqual(true);
    expect(todo3.isDone()).toEqual(true);
    expect(() => list.markUndoneAt(5)).toThrow(ReferenceError); //trying to mark an index that doesn't exist will throw an error
  });

  test('markAllDone marks the entire list as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toEqual(true);
    expect(todo2.isDone()).toEqual(true);
    expect(todo3.isDone()).toEqual(true);
    expect(list.isDone()).toEqual(true);
  });

  test('removeAt() removes a todo at a given index or returns a ReferenceError', () => {
    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
    expect(() => list.removeAt(5)).toThrow(ReferenceError);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    expect(list.toString()).toBe(string);
    list.markDoneAt(0);
    let string2 = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    expect(list.toString()).toBe(string2);
    list.markAllDone();
    let string3 = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    expect(list.toString()).toBe(string3);
  });

  test('forEach() iterates over all items in the list', () => {
    let result = [];
    list.forEach(todo => result.push(todo));

    expect(result).toEqual([todo1, todo2, todo3]);
  });

  xtest('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);
  
    expect(newList.title).toBe(list.title);
  
    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
});