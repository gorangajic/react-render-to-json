/* eslint react/prefer-stateless-function: 0 */
import 'should';
import React from 'react';
import renderToJson from './src/renderToJson';

class SvgComponent extends React.Component {
    render() {
        return (
            <svg width="24" fill="#00ea00" height="24" viewBox="0 0 24 24">
                <g>
                    <path d="awesome-path" />
                </g>
            </svg>
        );
    }
}

function AwesomeComponent() {
    return (<div className="awesome">
        <span className="hi">Hello</span>
    </div>);
}

describe('react-render-to-json', () => {
    it('should convert class component', () => {
        const render = renderToJson(<SvgComponent foo="bar" />);
        render.name.should.be.equal('SvgComponent');
        render.attributes.foo.should.be.equal("bar");
        const svg = render.children[0];
        svg.name.should.be.equal("svg");
        svg.attributes.fill.should.be.equal("#00ea00");
        const g = svg.children[0];
        g.name.should.be.equal('g');
        g.children[0].name.should.be.equal('path');
        g.children[0].attributes.d.should.be.equal('awesome-path');
    });

    it('should convert stateless functional components', () => {
        const render = renderToJson(<AwesomeComponent foo="bar" />);
        render.name.should.be.equal('AwesomeComponent');
        const div = render.children[0];
        div.name.should.be.equal("div");
        div.attributes.className.should.be.equal("awesome");
        const span = div.children[0];
        span.name.should.be.equal("span");
        span.attributes.className.should.be.equal("hi");
        span.children[0].should.be.equal("Hello");
    });
});
