import React from 'react';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';
import * as AppConstants from './Constants';

class TodoApp extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {items: [], text: '', nowShowing: AppConstants.ALL_TODOS, editing: null};
		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
		this.handleDelete = this.handleDelete.bind( this );
		this.handleToggle = this.handleToggle.bind( this );
		this.handleUpdateNowShowing = this.handleUpdateNowShowing.bind( this );
		this.handleToggleAll = this.handleToggleAll.bind( this );
		this.handleClearCompleted = this.handleClearCompleted.bind( this );
	}

	handleChange( e ) {
		this.setState( {text: e.target.value} );
	}

	handleSubmit( e ) {
		e.preventDefault();
		if ( !this.state.text.length ) {
			return;
		}
		const newItem = {
			text: this.state.text,
			completed: false,
			id: Date.now(),
		};
		this.setState( state => (
			{
				items: state.items.concat( newItem ),
				text: '',
			}
		) );
	}

	handleDelete( selectedItem ) {
		this.setState( state => (
			{
				items: state.items.filter( item => item.id !== selectedItem.id ),
			}
		) );
	}

	handleToggle( selectedItem ) {
		this.setState( state => (
			{
				items: state.items.map( item => {
					if ( item.id === selectedItem.id ) {
						item.completed = !item.completed;
					}
					return item;
				} ),
			}
		) );
	}

	handleToggleAll( e ) {
		const checked = e.target.checked;
		this.setState( state => (
			{
				items: state.items.map( item => {
					if ( checked ) {
						item.completed = true;
					} else {
						item.completed = false;
					}
					return item;
				} ),
			}
		) );
	}

	handleUpdateNowShowing( e, nowShowing ) {
		e.preventDefault();
		this.setState( {nowShowing: nowShowing} );
	}

	handleClearCompleted( e ) {
		this.setState( state => (
			{
				items: state.items.filter( item => !item.completed ),
			}
		) );
	}

	partition( array, filter ) {
		let pass = [], fail = [];
		array.forEach( ( e, idx, arr ) => (
			filter( e, idx, arr ) ? pass : fail
		).push( e ) );
		return [pass, fail];
	}

	render() {

		const [completedItems, activeItems] = this.partition( this.state.items, item => item.completed );
		let shownItems = [];

		switch ( this.state.nowShowing ) {
			case AppConstants.ACTIVE_TODOS:
				shownItems = activeItems;
				break;
			case AppConstants.COMPLETED_TODOS:
				shownItems = completedItems;
				break;
			default:
				shownItems = this.state.items;
		}

		const leftItems = this.state.items.length - completedItems.length;

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<header className="header">
						<h1>todos</h1>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
							onChange={this.handleChange}
							value={this.state.text}
							autoFocus={true}
						/>
					</header>
					<section className="main">
						<input
							id="toggle-all"
							className="toggle-all"
							type="checkbox"
							onChange={this.handleToggleAll}
							checked={activeItems.length === 0}
						/>
						<label
							htmlFor="toggle-all"
						/>
						<ul className="todo-list">
							{shownItems.map( item => (
								<TodoItem item={item} key={item.id} onDelete={this.handleDelete}
								          onToggle={this.handleToggle}/>
							) )}
						</ul>
					</section>
					<TodoFooter
						leftItemsCount={leftItems}
						completedItemsCount={completedItems.length}
						nowShowing={this.state.nowShowing}
						updateNowShowing={this.handleUpdateNowShowing}
						clearCompleted={this.handleClearCompleted}
					/>
				</form>
			</div>
		);
	}

}

export default TodoApp;
