import $ from "jquery";

const animateBarsUp = (animation) => {
	const [left, pivot, right] = animation;
	const colorAllLeft = left.length <= 1;
	const colorAllRight = right.length <= 1;

	return new Promise((resolve) => {
		left
			.map((item) => item[0])
			.forEach((index) => {
				$(".bar")
					.eq(index)
					.animate(
						{
							top: "0%"
						},
						{
							duration: 1000
						}
					)
					.animate(
						{
							backgroundColor: colorAllLeft ? "#FCC261" : "#C1C6CC"
						},
						{
							duration: 500,
							complete: () => {}
						}
					);
			});
		right
			.map((item) => item[0])
			.forEach((index) => {
				$(".bar")
					.eq(index)
					.animate(
						{
							top: "0%"
						},
						{
							duration: 1000
						}
					)
					.animate(
						{
							backgroundColor: colorAllRight ? "#FCC261" : "#C1C6CC"
						},
						{
							duration: 500,
							complete: () => {}
						}
					);
			});
		$(".bar")
			.eq(pivot[0][0])
			.animate(
				{
					top: "0%"
				},
				{
					duration: 1000
				}
			)
			.animate(
				{
					backgroundColor: "#FCC261"
				},
				{
					duration: 500,
					complete: () => {
						resolve();
					}
				}
			);
	});
};

const animateSingleBarDownWithPromise = (transitions, animation) => {
	const barItems = $(".bar");
	const WIDTH =
		Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
	const containerWidth = Number($(".bars").css("width").slice(0, -2));
	return new Promise((resolve) => {
		if (transitions.length > 0) {
			const [index, steps] = transitions[0];
			barItems.eq(index).animate(
				{
					left: `+=${((steps * WIDTH) / containerWidth) * 100}%`,
					top: "105%"
				},
				{
					duration: 1000,
					complete: () => {
						if (transitions.length > 1) {
							animateSingleBarDownWithPromise(transitions.slice(1), animation).then(() => {
								resolve();
							});
						} else {
							animateBarsUp(animation).then(() => {
								resolve();
							});
						}
					}
				}
			);
		}
	});
};

const animatePivotDown = (animation) => {
	return new Promise((resolve) => {
		const barItems = $(".bar");
		const WIDTH =
			Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
		const containerWidth = Number($(".bars").css("width").slice(0, -2));
		const [left, pivot, right] = animation;
		const [pivotIndex, steps] = pivot[0];
		$(".bar")
			.eq(pivotIndex)
			.animate(
				{
					top: "105%",
					left: `+=${((steps * WIDTH) / containerWidth) * 100}%`
				},
				{
					duration: 1000,
					complete: () => {
						animateSingleBarDownWithPromise([...left, ...right], animation).then(() => {
							resolve();
						});
					}
				}
			);
	});
};

const animateBarsStartColor = (animation) => {
	const [left, pivot, right] = animation;
	return new Promise((resolve) => {
		left.forEach((bar) => {
			$(".bar")
				.eq(bar[0])
				.animate(
					{
						backgroundColor: "#61bffc"
					},
					{
						duration: 500,
						complete: () => {}
					}
				);
		});
		right.forEach((bar) => {
			$(".bar")
				.eq(bar[0])
				.animate(
					{
						backgroundColor: "#61bffc"
					},
					{
						duration: 500,
						complete: () => {}
					}
				);
		});
		$(".bar")
			.eq(pivot[0][0])
			.animate(
				{
					backgroundColor: "#D596FF"
				},
				{
					duration: 500,
					complete: () => {
						animatePivotDown(animation).then(() => {
							resolve();
						});
					}
				}
			);
	});
};

// const animatePivotColor = (animation) => {
// 	return new Promise((resolve) => {
// 		$(".bar")
// 			.eq(animation[1][0][0])
// 			.animate(
// 				{
// 					backgroundColor: "#61bffc"
// 				},
// 				{
// 					duration: 500,
// 					complete: () => {
// 						animateBarsStartColor(animation).then(() => {
// 							resolve();
// 						});
// 					}
// 				}
// 			);
// 	});
// };

const undoQuickSortAnimations = (animations) => {
	const [left, pivot, right] = animations;
	const items = [...left, ...pivot, ...right];
	const barItems = $(".bar");
	const WIDTH =
		Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
	return new Promise((resolve) => {
		items.forEach((animation, animationIndex) => {
			const [barIndex, steps] = animation;
			barItems.eq(barIndex).animate(
				{
					left: `+=${-1 * steps * WIDTH}px`,
					backgroundColor: "#C1C6CC"
				},
				{
					duration: 0,
					complete: () => {
						if (animationIndex === items.length - 1) {
							resolve();
						}
					}
				}
			);
		});
	});
};

const doQuickSortAnimation = (animation) => {
	return new Promise((resolve) => {
		animateBarsStartColor(animation).then(() => {
			resolve();
		});
	});
};

export { doQuickSortAnimation as default, undoQuickSortAnimations };
