import * as React from 'react';
import * as _ from 'underscore';

import { Project, ProjectCategory } from './Models';
import { FilterButton } from './FilterButton';
import { ListItem } from './ListItem'
import loadingSpinner from './LoadingSpinner';


interface IState {
  currentFilter: string;
  currentOffset: number;
  take: number;

  List: Project[];
  Categories: ProjectCategory[];
  isLoading: boolean;
}

export class Gallery extends React.Component<{ ListOfProject: Project[] }, IState> {

  state: IState = {
    currentFilter: null,
    currentOffset: 0,
    take: 12,
    List: [],
    Categories: [],
    isLoading: true
  };
  componentDidMount() {
    const state = this.state;
    state.isLoading = false;
    state.List = this.props.ListOfProject.filter((i, index) => {
      return index < this.state.take
    });
    state.Categories = _.sortBy(_.uniq(this.props.ListOfProject.map(item => item.category)), 'key');

    this.setState(state);

  }
  showAll = () => this.setfilter();
  pageNext = () => this.page(false);
  pagePrev = () => this.page(true);

  page = (back: boolean) => {
    const currentState = this.state;
    currentState.List = [];
    currentState.isLoading = true;
    this.setState(currentState);

    setTimeout(() => {
      const catItems = this.props.ListOfProject.filter(item => (currentState.currentFilter ? item.category.key === currentState.currentFilter : true))
      currentState.List = [];

      const offset = currentState.currentOffset + (back ? -12 : 12);
      currentState.currentOffset = offset > 0 && offset < catItems.length ? offset : currentState.currentOffset;

      catItems.forEach((item, index, list) => {
        if (currentState.List.length < currentState.take && index > currentState.currentOffset) {
          currentState.List.push(item)
        }
      })
      currentState.isLoading = false;
      this.setState(currentState);
    }, 150)

  }

  setfilter = (key?: string) => {
    const currentState = this.state;
    currentState.currentFilter = key ? key : null;

    currentState.List = [];
    currentState.isLoading = true;
    this.setState(currentState);


    setTimeout(() => {
      currentState.currentOffset = 0;
      currentState.List = this.props.ListOfProject
        .filter(item => {
          return key ? item.category.key === key : true;
        }).filter((items, index) => {
          return index < currentState.take
        })
      currentState.isLoading = false;
      this.setState(currentState);
    }, 150);


  }
  render() {
    return <div className="ProjectList">
              <div>
                <div className="btn-group" role="group">
                  <FilterButton key={null} name="alle" filterKey={ null } setfilter={ this.setfilter } isCurrent={ this.state.currentFilter === null } />

                  { this.state.Categories.map((category, key) => {
                    return <FilterButton key={key} name={category.name} filterKey={category.key} setfilter={ this.setfilter } isCurrent={ this.state.currentFilter === category.key } />
                  }) }
                  </div>
                </div>

              <div className="row">
                  {this.state.List.map((item, key) => {
                    return <ListItem key={ key } imgUrl={ item.imgUrl } Item={ item } url={ item.url } />
                  }) }
                </div>
                { this.state.isLoading ? loadingSpinner :
                  <div className="padding">
                  <button className="btn btn-default pull-right" onClick={ this.pageNext }><i className="fa fa-angle-right"></i></button>
                  <button className="btn btn-default pull-right" onClick={ this.pagePrev }><i className="fa fa-angle-left"></i></button>
                    </div>
                }
      </div>
  }
}