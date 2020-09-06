import $ from "jquery";
import "jquery-ui";

const insertBar = (barIndex, step) => {
	return new Promise((resolve) => {
		const barItems = $(".bar");
		const WIDTH =
			Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
		const containerWidth = Number($(".bars").css("width").slice(0, -2));
		$(".bar")
			.eq(barIndex)
			.animate(
				{
					left: `-=${((step * WIDTH) / containerWidth) * 100}%`,
					top: "0%"
				},
				{
					duration: 1000,
					complete: () => {}
				}
			)
			.animate(
				{
					backgroundColor: "#61bffc"
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

const slideBarsRightOneUnit = (transitions, current) => {
	return new Promise((resolve) => {
		const barItems = $(".bar");
		const WIDTH =
			Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
		const containerWidth = Number($(".bars").css("width").slice(0, -2));
		if (transitions.length === 0) {
			setTimeout(() => {
				insertBar(current, 0).then(() => {
					resolve();
				});
			}, 500);
		}
		transitions.forEach((barIndex, index) => {
			$(".bar")
				.eq(barIndex)
				.animate(
					{
						left: `+=${(WIDTH / containerWidth) * 100}%`
					},
					{
						duration: 1000,
						complete: () => {
							if (index === transitions.length - 1) {
								insertBar(current, transitions.length).then(() => {
									resolve();
								});
							}
						}
					}
				);
		});
	});
};

const animateBarDown = (current, transitions) => {
	return new Promise((resolve) => {
		$(".bar")
			.eq(current)
			.animate(
				{
					top: "105%"
				},
				{
					duration: 1000,
					complete: () => {
						slideBarsRightOneUnit(transitions, current).then(() => {
							resolve();
						});
					}
				}
			);
	});
};

const animateCurrentBarColor = (barIndex) => {
	$(".bar")
		.eq(barIndex)
		.animate(
			{
				backgroundColor: "#D596FF"
			},
			{
				duration: 500,
				complete: () => {}
			}
		);
};

const animateLeftArrayColor = (leftArray) => {
	leftArray.forEach((barIndex) => {
		$(".bar")
			.eq(barIndex)
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
};

// this must return a promise
const doInsertionSortAnimation = (animations) => {
	return new Promise((resolve) => {
		const [current, leftArray, transitions] = animations;
		animateCurrentBarColor(current);
		animateLeftArrayColor(leftArray);
		animateBarDown(current, transitions).then(() => {
			resolve();
		});
	});
};

const undoInsertionSortAnimations = (animations) => {
	const barItems = $(".bar");
	const WIDTH =
		Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
	const containerWidth = Number($(".bars").css("width").slice(0, -2));
	const [current, leftArray, transitions] = animations;
	return new Promise((resolve) => {
		$(".bar")
			.eq(current)
			.animate(
				{
					left: "0%",
					backgroundColor: "#C1C6CC"
				},
				{
					duration: 0,
					complete: () => {}
				}
			);
		if (leftArray.length === 1) {
			$(".bar")
				.eq(leftArray[0])
				.animate(
					{
						backgroundColor: "#C1C6CC"
					},
					{
						duration: 0,
						complete: () => {}
					}
				);
		}
		if (transitions.length === 0) {
			resolve();
		}
		transitions.forEach((barIndex, index) => {
			$(".bar")
				.eq(barIndex)
				.animate(
					{
						left: `-=${(WIDTH / containerWidth) * 100}%`
					},
					{
						duration: 0,
						complete: () => {
							if (index === transitions.length - 1) {
								resolve();
							}
						}
					}
				);
		});
	});
};

export { doInsertionSortAnimation as default, undoInsertionSortAnimations };
