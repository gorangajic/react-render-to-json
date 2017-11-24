/* eslint new-cap:0 */
export default function renderToJson(element) {
    let res = {};
    if (!element || !element.type) {
        return element;
    }
    const Component = element.type;
    res.name = element.type;
    res.attributes = { ...element.props };
    let children = element.props ? element.props.children : null;
    delete res.attributes.children;
    if (typeof Component !== "string") {
        res.name = Component.name;
        const context = element.context || {};
        if (Component.prototype && typeof Component.prototype.render === "function") { // ReactComponent
            children = new Component(element.props, context).render();
        } else { // function component
            children = Component(element.props, context);
        }
    }
    if (Array.isArray(children)) {
        res.children = children.map(child => renderToJson(child));
        return res;
    }
    res.children = children ? [renderToJson(children)] : [];
    return res;
}
