import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
	const navContainerRef = useRef(null);
	const audioElementRef = useRef(null);

	const [isIndicatorActive, setIsIndicatorActive] = useState(false);
	const [isAudioPlaying, setIsAudioPlaying] = useState(false);

	const [isNavbarVisible, setIsNavbarVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const { y: currentScrollY } = useWindowScroll();

	const toggleAudioIndicator = () => {
		setIsAudioPlaying((prev) => !prev);
		setIsIndicatorActive((prev) => !prev);
	};

	useEffect(() => {
		if (currentScrollY === 0) {
			setIsNavbarVisible(true);
			navContainerRef.current.classList.remove("floating-nav");
		} else if (currentScrollY > lastScrollY) {
			setIsNavbarVisible(false);
			navContainerRef.current.classList.add("floating-nav");
		} else if (currentScrollY < lastScrollY) {
			setIsNavbarVisible(true);
			navContainerRef.current.classList.add("floating-nav");
		}
		setLastScrollY(currentScrollY);
	}, [currentScrollY, lastScrollY]);

	useGSAP(
		() => {
			gsap.to(navContainerRef.current, {
				y: isNavbarVisible ? 0 : -100,
				opacity: isNavbarVisible ? 1 : 0,
				duration: 0.1,
				ease: "power2.inOut",
			});
		},
		{ dependencies: [isNavbarVisible] }
	);

	useEffect(() => {
		audioElementRef.current.volume = 0.0;
		const targetVolume = 0.8;
		const step = 0.008;
		const interval = 100;

		const volumeInterval = setInterval(() => {
			if (audioElementRef.current.volume < targetVolume) {
				audioElementRef.current.volume = Math.min(
					audioElementRef.current.volume + step,
					targetVolume
				);
			} else {
				clearInterval(volumeInterval);
			}
		}, interval);

		return () => clearInterval(volumeInterval);
	}, [isAudioPlaying]);

	useEffect(() => {
		if (isAudioPlaying) {
			audioElementRef.current.play();
		} else {
			audioElementRef.current.pause();
		}
	}, [isAudioPlaying]);

	return (
		<div
			ref={navContainerRef}
			className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
		>
			<header className="absolute top-1/2 w-full -translate-y-1/2">
				<nav className="flex size-full items-center justify-between p-4">
					<div className="flex items-center gap-7">
						<p className="special-font font-zentry text-2xl text-white">
							Ze<b>n</b>try
						</p>
						<Button
							id="product-button"
							title="Products"
							rightIcon={<TiLocationArrow />}
							containerClass="bg-blue-50 md:flex hidden item-center justify-center gap-1"
						/>
					</div>
					<div className="flex h-full items-center justify-center">
						<div className="hidden md:block">
							{navItems.map((item, index) => (
								<a
									key={index}
									className="nav-hover-btn"
									href={`#${item.toLowerCase()}`}
								>
									{item}
								</a>
							))}
						</div>
						<button
							className="ml-10 flex items-center space-x-0.5"
							onClick={toggleAudioIndicator}
						>
							<audio
								ref={audioElementRef}
								className="hidden"
								src="/audio/loop.mp3"
								loop
								autoPlay
							/>
							{[1, 2, 3, 4].map((bar) => (
								<div
									key={bar}
									className={`indicator-line ${
										isIndicatorActive ? "active" : ""
									}`}
									style={{ animationDelay: `${bar * 0.1}s` }}
								/>
							))}
						</button>
					</div>
				</nav>
			</header>
		</div>
	);
};

export default Navbar;
