/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

const SelectBox = () => (
	<div className="select-box">
		<div className="select-box__current" tabIndex="-1">
			<div className="select-box__value">
				<input className="select-box__input" type="radio" id="0" value="1" name="A" defaultChecked="checked" />
				<p className="select-box__input-text">Breadth First Search</p>
			</div>
			<div className="select-box__value">
				<input className="select-box__input" type="radio" id="1" value="2" name="A" defaultChecked="checked" />
				<p className="select-box__input-text">Depth First Search</p>
			</div>
			<div className="select-box__value">
				<input className="select-box__input" type="radio" id="2" value="3" name="A" defaultChecked="checked" />
				<p className="select-box__input-text">Dijkstras Algorithm</p>
			</div>
			<i className="select-box__icon fas fa-chevron-down" />
		</div>
		<ul className="select-box__list">
			<li>
				<label className="select-box__option" htmlFor="0">
					Breadth First Search
				</label>
			</li>
			<li>
				<label className="select-box__option" htmlFor="1">
					Depth First Search
				</label>
			</li>
			<li>
				<label className="select-box__option" htmlFor="2">
					Dijkstras Algorithm
				</label>
			</li>
		</ul>
	</div>
);

export default SelectBox;
