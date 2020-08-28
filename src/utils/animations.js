import $ from "jquery";
import "jquery-ui";

const animateBarsUp = (indicies) => {
	return new Promise((resolve) => {
		indicies.forEach((index, i) => {
			$(".bar")
				.eq(index)
				.animate(
					{
						top: "-=70px"
					},
					{
						duration: 1000
					}
				)
				.animate(
					{
						backgroundColor: "red"
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
						top: "+=70px"
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

// const animateBarsDownWithPromise = (transitionDownAnimations, transitionUpIndicies) => {
// 	return new Promise((resolve) => {
// 		transitionDownAnimations.forEach((transitionDownAnimation, animationIndex) => {
// 			const [index, steps] = transitionDownAnimation;
// 			$(".bar")
// 				.eq(index)
// 				.animate(
// 					{
// 						left: `+=${steps * 70}px`,
// 						top: "+=70px"
// 					},
// 					{
// 						duration: 2000,
// 						complete: () => {
// 							if (animationIndex === transitionDownAnimations.length - 1) {
// 								animateBarsUp(transitionUpIndicies).then(() => {
// 									resolve();
// 								});
// 							}
// 						}
// 					}
// 				);
// 		});
// 	});
// };

// const animateBarsDown = (transitionDownAnimations, transitionUpIndicies) => {
// 	if (transitionDownAnimations.length > 0) {
// 		const [index, steps] = transitionDownAnimations[0];
// 		$.when(
// 			$(".bar").eq(index).animate(
// 				{
// 					backgroundColor: "green"
// 				},
// 				500
// 			),
// 			$(".bar")
// 				.eq(index)
// 				.animate(
// 					{
// 						left: `+=${steps * 70}px`,
// 						top: "+=70px"
// 					},
// 					1000
// 				)
// 		).done(() => {
// 			if (transitionDownAnimations.length > 1) {
// 				animateBarsDown(transitionDownAnimations.slice(1), transitionUpIndicies);
// 			} else {
// 				animateBarsUp(transitionUpIndicies).then(() => {
// 					console.log("finished");
// 				});
// 			}
// 		});
// 	}
// };

const animateBarsStartColor = (transitionDownAnimations, transitionUpIndicies, startColorIndicies) => {
	return new Promise((resolve) => {
		startColorIndicies.forEach((barIndex, index) => {
			$(".bar")
				.eq(barIndex)
				.animate(
					{
						backgroundColor: "green"
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
			const color = barsUsed.includes(barIndex) ? "red" : "yellow";
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