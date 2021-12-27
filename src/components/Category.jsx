import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export default function Category({ category, size, onSelect }) {
    const [hovering, setHovering] = useState(false);
    const styles = useSpring({ transform: hovering ? 'rotate(3deg)' : 'rotate(0deg)' });

    return (
        <animated.div
            style={styles}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Card className={`card--bg-${category.color}`} onClick={() => onSelect(category)}>
                <Card.Body
                    className={classNames('text-center', {
                        'd-flex align-items-center justify-content-center p-2': size === 'sm',
                    })}
                >
                    <FontAwesomeIcon icon={category.icon} size="3x" />
                    <h3 className={classNames('mt-2 mb-0', { 'ms-3': size === 'sm' })}>
                        {category.name}
                    </h3>
                </Card.Body>
            </Card>
        </animated.div>
    );
}
