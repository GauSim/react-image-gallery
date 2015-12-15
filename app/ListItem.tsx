import * as React from 'react';
import * as Q from 'q';

import { Project } from './Models';
import loadingSpinner from './LoadingSpinner';


export class ListItem extends React.Component<{ imgUrl: string, url: string, Item: Project, key: number }, { isVisible: boolean }> {

	state = { isVisible: false }
	loadImage(imgUrl: string) {
		const d = Q.defer();

		const preLoad = new Image();
		preLoad.src = imgUrl;
		preLoad.onprogress = (e) => {
			d.notify(e.loaded / e.total);
		}
		preLoad.onload = (e) => {
			d.resolve(e);
		}
		return d.promise;
	}
	componentDidMount() {
		const state = this.state;
		state.isVisible = false;
		this.setState(state);

		// load image 
		this.loadImage(this.props.imgUrl)
			.then(d => {
				state.isVisible = true;
				this.setState(state);
			});
	}

	render() {
		return <div className="col-md-3" >
			<div className="ProjectListItem fadeIn" >
			{ !this.state.isVisible ? loadingSpinner : <img src={ this.props.imgUrl } className="img-responsive img-funky fadeIn" /> }
                <a className="name" href={this.props.url} target="_blank">
					<i className="fa fa-search"></i>
					</a>
				</div>
			</div>
	}
}