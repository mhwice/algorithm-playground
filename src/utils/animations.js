import $ from "jquery";
import "jquery-ui";

const HEIGHT = Math.round($(window).height() / 4);
const animateBarsUp = (indicies) => {
	return new Promise((resolve) => {
		indicies.forEach((index, i) => {
			$(".bar")
				.eq(index)
				.animate(
					{
						top: `-=${HEIGHT}px`
					},
					{
						duration: 1000
					}
				)
				.animate(
					{
						backgroundColor: "#61bffc"
					},
					{
						duration: 500,
						complete: () => {
							if (i === indicies.length - 1) {
								resolve();
							}
						}
					}
				);
		});
	});
};

const animateSingleBarDownWithPromise = (transitionDownAnimations, transitionUpIndicies) => {
	return new Promise((resolve) => {
		if (transitionDownAnimations.length > 0) {
			const [index, steps] = transitionDownAnimations[0];
			$(".bar")
				.eq(index)
				.animate(
					{
						left: `+=${steps * 70}px`,
						top: `+=${HEIGHT}px`
					},
					{
						duration: 1000,
						complete: () => {
							if (transitionDownAnimations.length > 1) {
								animateSingleBarDownWithPromise(transitionDownAnimations.slice(1), transitionUpIndicies).then(() => {
									resolve();
								});
							} else {
								animateBarsUp(transitionUpIndicies).then(() => {
									resolve();
								});
							}
						}
					}
				);
		}
	});
};

const animateBarsStartColor = (transitionDownAnimations, transitionUpIndicies, startColorIndicies) => {
	return new Promise((resolve) => {
		startColorIndicies.forEach((barIndex, index) => {
			$(".bar")
				.eq(barIndex)
				.animate(
					{
						backgroundColor: "#D596FF"
					},
					{
						duration: 500,
						complete: () => {
							if (index === startColorIndicies.length - 1) {
								animateSingleBarDownWithPromise(transitionDownAnimations, transitionUpIndicies).then(() => {
									resolve();
								});
							}
						}
					}
				);
		});
	});
};

const animateBars = (transitionDownAnimations, transitionUpIndicies, startColorIndicies) => {
	return new Promise((resolve) => {
		animateBarsStartColor(transitionDownAnimations, transitionUpIndicies, startColorIndicies).then(() => {
			resolve();
		});
	});
};

const undoAnimations = (animations, barsUsed) => {
	return new Promise((resolve) => {
		animations.forEach((animation, animationIndex) => {
			const [barIndex, steps] = animation;
			const color = barsUsed.includes(barIndex) ? "#61bffc" : "#C1C6CC";
			$(".bar")
				.eq(barIndex)
				.animate(
					{
						left: `+=${-1 * steps * 70}px`,
						backgroundColor: color
					},
					{
						duration: 0,
						complete: () => {
							if (animationIndex === animations.length - 1) {
								resolve();
							}
						}
					}
				);
		});
	});
};

export { animateBars as default, undoAnimations };
