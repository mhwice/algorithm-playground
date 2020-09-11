import $ from "jquery";

const animateBarEndColor = (newIndex) => {
	return new Promise((resolve) => {
		$(".bar")
			.eq(newIndex)
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

const animateSwap = (newIndex, oldIndex, steps) => {
	// console.log(`Swapping newIndex ${newIndex} with oldIndex ${oldIndex} by ${steps} steps`);
	return new Promise((resolve) => {
		const barItems = $(".bar");
		const WIDTH =
			Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
		const containerWidth = Number($(".bars").css("width").slice(0, -2));
		$(".bar")
			.eq(newIndex)
			.animate(
				{
					left: `-=${((steps * WIDTH) / containerWidth) * 100}%`
				},
				{
					duration: 1000,
					complete: () => {}
				}
			);
		$(".bar")
			.eq(oldIndex)
			.animate(
				{
					left: `+=${((steps * WIDTH) / containerWidth) * 100}%`
				},
				{
					duration: 1000,
					complete: () => {
						animateBarEndColor(newIndex).then(() => {
							resolve();
						});
					}
				}
			);
	});
};

const animateBarColor = (animation) => {
	const [originalIndex] = animation;
	return new Promise((resolve) => {
		$(".bar")
			.eq(originalIndex)
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

const getOldMinIndex = (animations, newIndex) => {
	const mins = animations.filter((item) => item.length > 1).map((item) => item[0]);
	const currentIndex = mins.indexOf(newIndex);
	if (currentIndex - 1 >= 0) {
		return mins[currentIndex - 1];
	}
	return 0;
};

const animateMinChange = (newIndex, oldIndex) => {
	// console.log(`Highlighting newIndex ${newIndex} and deselecting oldIndex ${oldIndex}`);
	return new Promise((resolve) => {
		$(".bar")
			.eq(newIndex)
			.animate(
				{
					backgroundColor: "#61bffc"
				},
				{
					duration: 500,
					complete: () => {}
				}
			);
		$(".bar")
			.eq(oldIndex)
			.animate(
				{
					backgroundColor: "#C1C6CC"
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

const animateBars = (transitions, animations) => {
	return new Promise((resolve) => {
		if (transitions.length > 0) {
			const item = transitions[0];
			const originalIndex = item[0];
			$(".bar")
				.eq(originalIndex)
				.animate(
					{
						backgroundColor: "#D596FF"
					},
					{
						duration: 500,
						complete: () => {
							if (item.length === 2) {
								animateMinChange(originalIndex, getOldMinIndex(animations, originalIndex)).then(() => {
									animateBars(transitions.slice(1), animations).then(() => {
										resolve();
									});
								});
							} else {
								$(".bar")
									.eq(originalIndex)
									.animate(
										{
											backgroundColor: "#C1C6CC"
										},
										{
											duration: 500,
											complete: () => {
												animateBars(transitions.slice(1), animations).then(() => {
													resolve();
												});
											}
										}
									);
							}
						}
					}
				);
		} else {
			const steps =
				animations
					.filter((item) => item.length > 1)
					.map((item) => item[1])
					.pop() - animations[0][1];
			if (steps === 0) {
				animateBarEndColor(
					animations
						.filter((item) => item.length > 1)
						.map((item) => item[0])
						.pop()
				).then(() => {
					resolve();
				});
			} else {
				animateSwap(
					animations
						.filter((item) => item.length > 1)
						.map((item) => item[0])
						.pop(),
					animations[0][0],
					steps
				).then(() => {
					resolve();
				});
			}
		}
	});
};

const doSelectionSortAnimation = (animations) => {
	return new Promise((resolve) => {
		animateBarColor(animations[0]).then(() => {
			animateBars([...animations.slice(1)], animations).then(() => {
				resolve();
			});
		});
	});
};

const undoSelectionSortAnimations = (animations) => {
	const barItems = $(".bar");
	const WIDTH =
		Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
	const containerWidth = Number($(".bars").css("width").slice(0, -2));
	return new Promise((resolve) => {
		const steps =
			animations
				.filter((item) => item.length > 1)
				.map((item) => item[1])
				.pop() - animations[0][1];

		const newIndex = animations
			.filter((item) => item.length > 1)
			.map((item) => item[0])
			.pop();
		const oldIndex = animations[0][0];

		$(".bar")
			.eq(newIndex)
			.animate(
				{
					left: `+=${((steps * WIDTH) / containerWidth) * 100}%`,
					backgroundColor: "#C1C6CC"
				},
				{
					duration: 0,
					complete: () => {}
				}
			);
		$(".bar")
			.eq(oldIndex)
			.animate(
				{
					left: `-=${((steps * WIDTH) / containerWidth) * 100}%`
				},
				{
					duration: 0,
					complete: () => {
						resolve();
					}
				}
			);
	});
};

export { doSelectionSortAnimation as default, undoSelectionSortAnimations };
