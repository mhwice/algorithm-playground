import React from "react";
import PropTypes from "prop-types";

const MediaButtons = ({ moveBackward, playPauseToggle, moveForward, resetAll, isEditing, isPlaying }) => (
	<div className="button-row">
		{!isEditing && (
			<div className="media-button-container">
				<button className="media-button" onClick={moveBackward} type="button">
					<i className="fas fa-backward" />
				</button>
				<button className="media-button" onClick={playPauseToggle} type="button">
					{isPlaying ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
				</button>
				<button className="media-button" onClick={moveForward} type="button">
					<i className="fas fa-forward" />
				</button>
				<button className="media-button" onClick={resetAll} type="button">
					<i className="fas fa-redo-alt" />
				</button>
				<button className="media-button" onClick={resetAll} type="button">
					<i className={true ? "fas fa-table" : "fas fa-project-diagram"} />
				</button>
			</div>
		)}
	</div>
);

MediaButtons.propTypes = {
	moveBackward: PropTypes.func.isRequired,
	playPauseToggle: PropTypes.func.isRequired,
	moveForward: PropTypes.func.isRequired,
	resetAll: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
	isPlaying: PropTypes.bool.isRequired
};

export default MediaButtons;
