import * as React from 'react';

export class FilterButton extends React.Component<{ name: string; filterKey: string; key: number; setfilter: (key: string) => void; isCurrent: boolean }, {}> {
	onClick = () => {
		this.props.setfilter(this.props.filterKey);
	}
	render() {
		return <button type="button" onClick={ this.onClick } className={ this.props.isCurrent ? 'btn btn-primary' : 'btn btn-default'} role="presentation"> <span > { this.props.name }  </span></button>
	}
}