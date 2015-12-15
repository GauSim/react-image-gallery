import * as React from 'react';

export class FilterButton extends React.Component<{ name: string; filterKey: string; key: number; setfilter: (key: string) => void; isCurrent: boolean }, {}> {
	onClick = () => {
		this.props.setfilter(this.props.filterKey);
	}
	render() {
		return <li className={ this.props.isCurrent ? 'active' : 'pointer'} role="presentation"> <a onClick={ this.onClick }> { this.props.name }  </a></li>
	}
}