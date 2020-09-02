import $ from "jquery";
import "jquery-ui";

const animateBarsUp = (indicies) => {
	const HEIGHT = Math.round($(".bars").height()) + 10;
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
	const HEIGHT = Math.round($(".bars").height()) + 10;
	const barItems = $(".bar");
	const WIDTH =
		Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
	console.log("WIDTH", WIDTH);
	return new Promise((resolve) => {
		if (transitionDownAnimations.length > 0) {
			const [index, steps] = transitionDownAnimations[0];
			barItems.eq(index).animate(
				{
					left: `+=${steps * WIDTH}px`,
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
	const barItems = $(".bar");
	const WIDTH =
		Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
	return new Promise((resolve) => {
		animations.forEach((animation, animationIndex) => {
			const [barIndex, steps] = animation;
			const color = barsUsed.includes(barIndex) ? "#61bffc" : "#C1C6CC";
			barItems.eq(barIndex).animate(
				{
					left: `+=${-1 * steps * WIDTH}px`,
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

const clearAnimations = () => {
	$(".bar").animate(
		{
			left: "0px",
			backgroundColor: "#C1C6CC"
		},
		0
	);
};

export { animateBars as default, undoAnimations, clearAnimations };
