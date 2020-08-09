function* process() {
	for (let i = 0; i < 10; i += 1) {
		yield i;
	}
}

const myProcess = process();
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
console.log(myProcess.next());
