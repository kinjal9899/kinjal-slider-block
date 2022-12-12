import "./style.scss";
import "./editor.scss";

const registerBlockType = wp.blocks.registerBlockType;

const { __ } = wp.i18n;

const { Button } = wp.components;
const { MediaUpload, MediaUploadCheck, PlainText } = wp.blockEditor;

const ALLOWED_MEDIA_TYPES = ['image'];

// Note: I purposely used "kinjalslider" in the block name.
registerBlockType('theme/kinjalslider', {
    apiVersion: 2,
    title: 'Kinjal Slider',
    category: 'layout',
    icon: {
        background: '#7e70af',
        foreground: '#fff',
        src: <span class="dashicons dashicons-slides"></span>,
    },
    attributes: {
        id: {
            source: "attribute",
            selector: ".carousel.slide",
            attribute: "id",
        },
        testimonials: {
            source: "query",
            default: [],
            selector: "blockquote.testimonial",
            query: {
                image: {
                    source: "attribute",
                    selector: "img",
                    attribute: "src",
                },
                index: {
                    source: "text",
                    selector: "span.testimonial-index",
                },
                content: {
                    source: "text",
                    selector: "span.testimonial-text",
                },
                author: {
                    source: "text",
                    selector: "span.testimonial-author span",
                },
            },
        },
    },

    edit(props) {
        const { testimonials } = props.attributes;

        const testimonialsList = testimonials
            .sort((a, b) => a.index - b.index)
            .map((testimonial) => {
                return (
                    <div className="gts-testimonial-block">
                        <p>
                            <span>
                                Insert Testmonial {Number(testimonial.index) + 1} Here:
                            </span>
                            <span
                                className="remove-testimonial"
                                onClick={() => {
                                    const newTestimonials = testimonials
                                        .filter((item) => item.index != testimonial.index)
                                        .map((t) => {
                                            if (t.index > testimonial.index) {
                                                t.index -= 1;
                                            }

                                            return t;
                                        });

                                    props.setAttributes({
                                        testimonials: newTestimonials,
                                    });
                                }}
                            >
                                <i className="fa fa-times" />
                            </span>
                        </p>
                        <div className="row">
                            <div className="gts__picture col-3">
                                <MediaUpload
                                    onSelect={(media) => {
                                        const image = media.sizes.full
                                            ? media.sizes.full.url
                                            : media.url;
                                        const newObject = Object.assign({}, testimonial, {
                                            image: image,
                                        });
                                        props.setAttributes({
                                            testimonials: [
                                                ...testimonials.filter(
                                                    (item) => item.index != testimonial.index
                                                ),
                                                newObject,
                                            ],
                                        });
                                    }}
                                    type="image"
                                    value={testimonial.image}
                                    render={({ open }) =>
                                        !!testimonial.image ? (
                                            <div>
                                                {props.isSelected && (
                                                    <div className="gts__picture__actions">
                                                        <a
                                                            href="#"
                                                            onClick={() => {
                                                                const newObject = Object.assign(
                                                                    {},
                                                                    testimonial,
                                                                    {
                                                                        image: null,
                                                                    }
                                                                );
                                                                props.setAttributes({
                                                                    testimonials: [
                                                                        ...testimonials.filter(
                                                                            (item) =>
                                                                                item.index != testimonial.index
                                                                        ),
                                                                        newObject,
                                                                    ],
                                                                });
                                                            }}
                                                        >
                                                            × Remove
                                                        </a>
                                                    </div>
                                                )}
                                                <img src={testimonial.image} />
                                                {/* <div
                                                    className="gts__picture__image"
                                                    style={{
                                                        backgroundImage: `url(${testimonial.image})`,
                                                    }}
                                                    onClick={open}
                                                /> */}
                                            </div>
                                        ) : (
                                            <a
                                                href="#"
                                                className="gts__picture__image"
                                                onClick={open}
                                            >
                                                Select Image
                                            </a>
                                        )
                                    }
                                />
                            </div>
                            <blockquote className="wp-block-quote">
                                {/* <label>Content:</label> */}
                                <PlainText
                                    className="content-plain-text"
                                    style={{ height: 58 }}
                                    placeholder="Testimonial Text"
                                    value={testimonial.content}
                                    autoFocus
                                    onChange={(content) => {
                                        const newObject = Object.assign({}, testimonial, {
                                            content: content,
                                        });
                                        props.setAttributes({
                                            testimonials: [
                                                ...testimonials.filter(
                                                    (item) => item.index != testimonial.index
                                                ),
                                                newObject,
                                            ],
                                        });
                                    }}
                                />
                            </blockquote>
                            <div className="col-9 mt-3">
                                <PlainText
                                    className="author-plain-text"
                                    placeholder="Author"
                                    value={testimonial.author}
                                    onChange={(author) => {
                                        const newObject = Object.assign({}, testimonial, {
                                            author: author,
                                        });
                                        props.setAttributes({
                                            testimonials: [
                                                ...testimonials.filter(
                                                    (item) => item.index != testimonial.index
                                                ),
                                                newObject,
                                            ],
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            });
        return (
            <div className={props.className}>
                {testimonialsList}
                <button
                    className="add-more-testimonial"
                    onClick={(content) =>
                        props.setAttributes({
                            testimonials: [
                                ...props.attributes.testimonials,
                                {
                                    index: props.attributes.testimonials.length,
                                    content: "",
                                    author: "",
                                },
                            ],
                        })
                    }
                >
                    +
                </button>
            </div>
        );
    },

    save(props) {
        const { id, testimonials } = props.attributes;
        const carouselIndicators = testimonials.map(function (testimonial, index) {
            return (
                <li
                    data-target={"#" + id}
                    data-slide-to={index}
                    className={testimonial.index == 0 ? "active" : ""}
                />
            );
        });
        const testimonialsList = testimonials.map(function (testimonial) {
        const carouselClass = testimonial.index == 0 ? "carousel-item active" : "carousel-item";
            return (
                <div className={carouselClass} key={testimonial.index}>
                    <blockquote className="testimonial">
                        <p>
                            <span className="testimonial-index" style={{ display: "none" }}>{testimonial.index}</span>
                        </p>
                        {testimonial.content && (
                            <p className="testimonial-text-container">
                                <i className="fa fa-quote-left pull-left" aria-hidden="true" />
                                <span className="testimonial-text">{testimonial.content}</span>
                                <i class="fa fa-quote-right pull-right" aria-hidden="true" />
                            </p>
                        )}
                        <div className="row">
                            {testimonial.image && (
                                <div className="gts__picture col-3">
                                    <img src={testimonial.image} />
                                    {/* <div
                                        className="gts__picture__image"
                                        style={{
                                            backgroundImage: `url(${testimonial.image})`,
                                        }}
                                    /> */}
                                </div>
                            )}
                            <div className="testimonial-author-container mt-3 col-9">
                                {testimonial.author && (
                                    <p className="testimonial-author-name">
                                        <span className="testimonial-author">
                                            &mdash; <span>{testimonial.author}</span>
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </blockquote>
                </div>
            );
        });
        if (testimonials.length > 0) {
            return (
                <div className="testimonial-slider">
                    <div className="carousel slide" data-ride="carousel" id={id}>
                        {/* <ol className="carousel-indicators">{carouselIndicators}</ol> */}
                        <div className="carousel-inner FG_slider BG_slider w-75 mx-auto">
                            {testimonialsList}
                        </div>
                    </div>
                </div>
            );
        } else return null;
    },
});