export class Project {

	isVisible: boolean = false;
	constructor(public name: string,
		public imgUrl: string,
		public url: string,
		public category: { name: string, key: string }) {
	}
}
