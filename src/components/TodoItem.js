import React from 'react';

class TodoItem extends React.Component {

	render() {
		return (
			<li className={(
				               this.props.item.completed ? ' completed ' : ''
			               ) + (
				               this.props.item.editing ? ' editing ' : ''
			               )}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.item.completed}
						onChange={() => this.props.onToggle( this.props.item )}
					/>
					<label>
						{this.props.item.text}
					</label>
					<button type="button" className="destroy" onClick={() => this.props.onDelete( this.props.item )}/>
				</div>
			</li>
		);
	}
}

export default TodoItem;
