/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";

/*

	items = ["Breadth First Search", "Depth First Search", "Dijkstras Algorithm"]

*/

const SelectBox = ({ items, handleClick }) => {
	return (
		<div className="select-box">
			<div className="select-box__current" tabIndex="-1">
				{items.map((item, itemIndex) => {
					return (
						<div key={itemIndex} className="select-box__value">
							<input
								className="select-box__input"
								type="radio"
								id={itemIndex}
								value={itemIndex + 1}
								name="select-box-radio-item"
								defaultChecked="checked"
								onClick={handleClick}
							/>
							<p className="select-box__input-text">{item}</p>
						</div>
					);
				})}
				<i className="select-box__icon fas fa-chevron-down" />
			</div>
			<ul className="select-box__list">
				{items.map((item, itemIndex) => {
					return (
						<li key={itemIndex}>
							<label className="select-box__option" htmlFor={itemIndex}>
								{item}
							</label>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

SelectBox.propTypes = {
	handleClick: PropTypes.func.isRequired,
	items: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default SelectBox;
