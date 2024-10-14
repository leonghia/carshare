import classes from "./Welcome.module.scss";
import logo from "../../assets/images/logo.svg";
import NextButton from "./NextButton/NextButton";
import EnterName from "./EnterName/EnterName";
import leftSideIllustrators from "../../assets/images/side_illustrators_1.webp";
import rightSideIllustrators from "../../assets/images/side_illustrators_2.webp";

export default function Welcome() {
    const handleClick = () => {
        console.log("clicked");
    }

    return (
        // Container
        <div className={classes.container}>
            {/* Section */}
            <div className={classes.section}>
                {/* Logo */}
                <figure className={classes.logo}>
                    <img className={classes.image} src={logo} alt="CarShare logo" />
                </figure>
                {/* Title & Enter name */}
                <div className={classes["title-and-enter-name"]}>
                    {/* Title */}
                    <h1 className={classes.title}>Chúng mình có thể gọi bạn là?</h1>
                    {/* Enter name */}
                    <EnterName />
                </div>
                {/* Button */}
                <NextButton onClick={handleClick} />
            </div>
            {/* Left side illustrators */}
            <figure className={classes["figure--left"]}>
                <img src={leftSideIllustrators} alt="left side illustrators" className={classes["figure__img"]} />
            </figure>
            {/* Left side light */}
            <div className={classes["light--left"]}></div>
            {/* Right side illustrators */}
            <figure className={classes["figure--right"]}>
                <img src={rightSideIllustrators} alt="left side illustrators" className={classes["figure__img"]} />
            </figure>
            {/* Left side light */}
            <div className={classes["light--right"]}></div>
        </div>
    );
}