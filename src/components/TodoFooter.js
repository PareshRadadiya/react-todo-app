import React from 'react';
import * as AppConstants from './Constants';

class TodoFooter extends React.Component {

	render() {

		let clearCompletedButton = null;

		if ( this.props.completedItemsCount > 0 ) {
			clearCompletedButton = (
				<button
					type="button"
					onClick={this.props.clearCompleted}
					className="clear-completed"
				>
					Clear completed
				</button>
			);
		}

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.leftItemsCount}</strong> left
				</span>
				<ul className="filters">
					<li>
						<a
							href="#!"
							onClick={( e ) => this.props.updateNowShowing( e, AppConstants.ALL_TODOS )}
							className={this.props.nowShowing === AppConstants.ALL_TODOS ? 'selected' : ''}>
							All
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#!"
							onClick={( e ) => this.props.updateNowShowing( e, AppConstants.ACTIVE_TODOS )}
							className={this.props.nowShowing === AppConstants.ACTIVE_TODOS ? 'selected' : ''}>
							Active
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#!"
							onClick={( e ) => this.props.updateNowShowing( e, AppConstants.COMPLETED_TODOS )}
							className={this.props.nowShowing === AppConstants.COMPLETED_TODOS ? 'selected' : ''}>
							Completed
						</a>
					</li>
				</ul>
				{clearCompletedButton}
			</footer>
		);
	}
}

export default TodoFooter;
