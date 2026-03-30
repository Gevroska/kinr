import { Component } from 'solid-js';

const Footer: Component = () => {
    return (
        <footer class="footer footer-center p-4 bg-base-300 text-base-content">
            <div>
                <p>
                    Kinr -{' '}
                    <a
                        class="text-blue-400"
                        href="https://github.com/Gevroska/kinr"
                    >
                        Source
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
