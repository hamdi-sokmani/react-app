import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from 'react-spring';
import NavigationMenu from "./NavigationMenu";

function Navigation() {
    const [showMenu, setShowMenu] = React.useState(false);

    const maskTransitions = useTransition(showMenu, {
        from:  { opacity: 0, position: 'absolute'},
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    const menuTransitions = useTransition(showMenu, {
        from : { opacity: 0, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    })

    return (
        <nav>
            <span className="text-xl">
                <FontAwesomeIcon 
                    icon={faBars}
                    onClick={() => setShowMenu(!showMenu)}
                />
            </span>

            {
                maskTransitions((props, item, key) => {
                    return (
                        item &&
                        <animated.div 
                            key={key}   
                            style={props}
                            className="bg-black-t-50 fixed top-0 left-0 w-full h-full z-50"
                            onClick={() => setShowMenu(false)}
                        >
                        </animated.div>
                    );
                  })
            }

            {
                menuTransitions((props, item, key) => {
                    return (
                        item &&
                        <animated.div 
                            key={key}   
                            style={props}
                            className="bg-white fixed top-0 left-0 w-4/5 h-full z-50 shadow p-3"
                        >
                            <NavigationMenu 
                                closeMenu={() => setShowMenu(false)}
                            />
                        </animated.div>
                    );
                })                
            }
        </nav>
    );
}

export default Navigation;