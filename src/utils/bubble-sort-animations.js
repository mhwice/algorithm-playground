import $ from "jquery";

const animateBarEndColor = (animation) => {
	return new Promise((resolve) => {
		$(".bar")
			.eq(animation[0])
			.animate(
				{
					backgroundColor: "#C1C6CC"
				},
				{
					duration: 500,
					complete: () => {}
				}
			);
		$(".bar")
			.eq(animation[1])
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

const animateSwap = (animation) => {
	return new Promise((resolve) => {
		const barItems = $(".bar");
		const WIDTH =
			Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
		const containerWidth = Number($(".bars").css("width").slice(0, -2));
		const [bar1, bar2] = animation;
		$(".bar")
			.eq(bar1)
			.animate(
				{
					left: `+=${(WIDTH / containerWidth) * 100}%`
				},
				{
					duration: 1000,
					complete: () => {}
				}
			);
		$(".bar")
			.eq(bar2)
			.animate(
				{
					left: `-=${(WIDTH / containerWidth) * 100}%`
				},
				{
					duration: 1000,
					complete: () => {
						animateBarEndColor(animation).then(() => {
							resolve();
						});
					}
				}
			);
	});
};

const animateLastBarColor = (animation, animateBoth) => {
	return new Promise((resolve) => {
		const [bar1, bar2, shouldSwap] = animation;
		$(".bar")
			.eq(shouldSwap ? bar1 : bar2)
			.animate(
				{
					backgroundColor: "#FCC261"
				},
				{
					duration: 500,
					complete: () => {
						if (animateBoth) {
							animateLastBarColor([bar1, bar2, !shouldSwap], false).then(() => {
								resolve();
							});
						} else {
							resolve();
						}
					}
				}
			);
	});
};

const animateBars = (transitions, animations) => {
	return new Promise((resolve) => {
		if (transitions.length > 0) {
			const [bar1, bar2, shouldSwap] = transitions[0];
			const bars = [bar1, bar2];
			bars.forEach((barIndex, i) => {
				$(".bar")
					.eq(barIndex)
					.animate(
						{
							backgroundColor: "#61bffc"
						},
						{
							duration: 500,
							complete: () => {
								if (i === bars.length - 1) {
									if (transitions.length > 0) {
										if (shouldSwap) {
											animateSwap(transitions[0]).then(() => {
												animateBars(transitions.slice(1), animations).then(() => {
													resolve();
												});
											});
										} else {
											animateBarEndColor(transitions[0]).then(() => {
												animateBars(transitions.slice(1), animations).then(() => {
													resolve();
												});
											});
										}
									}
								}
							}
						}
					);
			});
		} else if (animations.length === 1) {
			animateLastBarColor(animations[animations.length - 1], true).then(() => {
				resolve();
			});
		} else {
			animateLastBarColor(animations[animations.length - 1], false).then(() => {
				resolve();
			});
		}
	});
};

const doBubbleSortAnimation = (animations) => {
	return new Promise((resolve) => {
		if (animations.length === 0) {
			resolve();
		} else {
			animateBars([...animations], animations).then(() => {
				resolve();
			});
		}
	});
};

const undoBubbleSortAnimations = (animations, coloredItems) => {
	const barItems = $(".bar");
	const WIDTH =
		Number(barItems.css("width").slice(0, -2)) + 2 * Number(barItems.css("margin").split(" ")[1].slice(0, -2));
	return new Promise((resolve) => {
		if (coloredItems.length === 0) {
			resolve();
		}
		coloredItems.forEach((barIndex, index) => {
			barItems.eq(barIndex).animate(
				{
					backgroundColor: "#C1C6CC"
				},
				{
					duration: 0,
					complete: () => {
						if (index === coloredItems.length - 1) {
							if (animations.length === 0) {
								resolve();
							}
						}
					}
				}
			);
		});

		animations.forEach((animation, animationIndex) => {
			const [barIndex, steps] = animation;
			barItems.eq(barIndex).animate(
				{
					left: `+=${-1 * steps * WIDTH}px`
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

export { doBubbleSortAnimation as default, undoBubbleSortAnimations };
