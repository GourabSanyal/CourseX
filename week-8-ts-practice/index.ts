interface Todo {
  title: string;
  description: string;
  id: string;
  done: boolean;
}

type UpdateTodo = Partial<Todo>;

function updateTodo(id: number, newProps: UpdateTodo) {}

updateTodo(1, {
  title: "something",
}); 

function swap<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}

let ans = swap(3, 4);
let ans1 = swap(3, "4");
console.log(ans);
console.log(ans1);
