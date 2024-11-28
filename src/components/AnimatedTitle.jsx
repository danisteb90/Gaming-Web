import gsap from "gsap";
import { useEffect } from "react";
import { useRef } from "react";

const AnimatedTitle = ({ title, containerClass }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const titleAnimation = gsap.timeline({
				scrollTrigger: {
					start: "20% center",
					end: "center center",
					markers: false,
					toggleActions: "play none none reverse",
				},
			});

			titleAnimation.to(".animated-word", {
				opacity: 1,
				translateY: 0,
				duration: 1,
				ease: "power2.inOut",
				stagger: 0.02,
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div>
			<div ref={containerRef} className={`animated-title ${containerClass}`}>
				{title.split("<br />").map((line, index) => (
					<div
						key={index}
						className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
					>
						{line.split(" ").map((word, i) => (
							<span
								key={i}
								className="animated-word text-black"
								dangerouslySetInnerHTML={{ __html: word }}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default AnimatedTitle;
