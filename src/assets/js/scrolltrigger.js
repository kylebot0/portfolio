export function hero() {
    gsap.config({ nullTargetWarn: false });
    gsap.registerPlugin(ScrollTrigger);

    let hero = [".hero h1", ".hero p"]

    ScrollTrigger.batch(hero, {
        onEnter: elements => {
            gsap.from(elements, {
                autoAlpha: 0,
                duration: 1,
                x: -50,
                stagger: 0.4,
                delay: 1
            });
        },
        once: true
    });


    gsap.timeline({
            scrollTrigger: {
                trigger: '.hero',
                start: "top",
                end: "center bottom",
                scrub: true,
                // markers: true,
            }
        })
        .to(".arrows", {
            autoAlpha: 0,
            duration: 1,
        })
        // Talenten --------------
    let staggersTalenten = [".talenten h2", ".talenten p", ".talenten h3", ".talenten a", ".talenten li"]
    let tlTalenten;
    staggersTalenten.forEach(el => {
        gsap.set(el, { autoAlpha: 0, x: -50 })
    })

    ScrollTrigger.batch(staggersTalenten, {
        onEnter: batch => {
            if (tlTalenten && tlTalenten.isActive()) {
                tlTalenten.to(batch, { autoAlpha: 1, x: 0, stagger: 0.1 })
            } else {
                tlTalenten = gsap.timeline().to(batch, { autoAlpha: 1, x: 0, stagger: 0.1 })
            }
        },
        once: true
    });

    // Projecten ------------------------
    let staggersProjecten = [".projecten h2", ".slider"]
    let tlProjecten;
    staggersProjecten.forEach(el => {
        gsap.set(el, { autoAlpha: 0, x: -50 })
    })

    ScrollTrigger.batch(staggersProjecten, {
        onEnter: batch => {
            if (tlProjecten && tlProjecten.isActive()) {
                tlProjecten.to(batch, { autoAlpha: 1, x: 0, stagger: 0.5, delay: 0.5 })
            } else {
                tlProjecten = gsap.timeline().to(batch, { autoAlpha: 1, x: 0, stagger: 0.5, delay: 0.5 })
            }
        },
        once: true
    });

    // Footer --------------------
    let staggers = ["footer h2", ".contact-naam p", ".contact-informatie a", ".contact-informatie p", ".footer-cta a", ]
    let tl;
    staggers.forEach(el => {
        gsap.set(el, { autoAlpha: 0, x: -50 })
    })

    ScrollTrigger.batch(staggers, {
        onEnter: batch => {
            if (tl && tl.isActive()) {
                tl.to(batch, { autoAlpha: 1, x: 0, stagger: 0.2 })
            } else {
                tl = gsap.timeline().to(batch, { autoAlpha: 1, x: 0, stagger: 0.1 })
            }
        },
        once: true
    });



}


export function scrollTo() {
    let a = document.querySelectorAll('.underline')

    a.forEach(el => {
        el.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    })

}

export function slider() {
    const items = [{
            img: "./img/thorikos_beeld.png",
            opdrachtgever: "Universiteit van Utrecht",
            description: "Opgraaf monitor",
            techniek: "D3.JS, mapbox & SCSS",
            link: "#/projects/thorikos"
        },
        {
            img: "./img/jmango360.jpg",
            opdrachtgever: "JMango360",
            description: "E-Commerce",
            techniek: "Custom wordpress theme",
            link: "#/projects/jmango360"
        },
        {
            img: "./img/foxfit.png",
            opdrachtgever: "GainPlay Studio",
            description: "Asthma monitor",
            techniek: "D3.JS & Node",
            link: "#/projects/foxfit"
        },
        {
            img: "./img/nobillon.jpg",
            opdrachtgever: "Nobillon",
            description: "Vastgoed",
            techniek: "Custom wordpress theme",
            link: "#/projects/nobillon"
        },
    ];

    const timeLine = gsap.timeline();
    let moreInformation = document.querySelector(".slider__btns a")

    class Slider {

        constructor(items) {
            this.active = 0;
            this.items = items;
            document
                .querySelectorAll(".slider__btn-switch[data-type]")
                .forEach((btn) => {
                    btn.onclick = () => this.handleClick(btn.dataset.type);
                });
        }

        renderItem() {
            const { img, opdrachtgever, description, techniek, link } = this.items[this.active];

            const sliderContent = `
      <img class="slider__img" src="${img}" alt="${description}" />
      <div class="slider__context flex-column">
        <h3 class="slider__opdrachtgever">${opdrachtgever}</h3>
        <p class="slider__description">${description}</p>
        <p class="slider__techniek">${techniek}</p>
      </div>
    `;
            const sliderIndex = `
      <span>${
        this.active < 10 ? "0" + (this.active + 1) : this.active + 1
      }</span>
      <span>${
        this.items.length < 10 ? "0" + this.items.length : this.items.length
      }</span>
    `;
            moreInformation.href = link;
            document.querySelector(".slider__content").innerHTML = sliderContent;
            document.querySelector(".slider__index").innerHTML = sliderIndex;
        }

        basicAimation(dir, delay) {
            timeLine.to(".slider", {
                delay,
                duration: 0.2,
            });
            timeLine.fromTo(
                ".slider__img", {
                    x: 150 * dir,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                }
            );
            timeLine.fromTo(
                ".slider__context *", {
                    x: 50 * dir,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power2.out",
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power2.out",
                },
                "<"
            );
        }

        handleClick(type) {
            const dir = type === "next" ? 1 : -1;
            timeLine.to(".slider__img", {
                x: -250 * dir,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",

                onComplete: () => {
                    if (type === "next") {
                        this.active = this.active === items.length - 1 ? 0 : this.active + 1;
                    } else {
                        this.active = this.active <= 0 ? items.length - 1 : this.active - 1;
                    }

                    this.renderItem();
                    this.basicAimation(dir);
                },
            });
            timeLine.to(
                " .slider__context *", {
                    x: -100 * dir,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power2.inOut",
                },
                "<"
            );
        }
    }

    const slider = new Slider(items);
    slider.renderItem();
    slider.basicAimation(1, 1);

}

export function contact() {
    let staggers = ["section h2", ".contact-naam p", ".contact-informatie a", ".contact-informatie p", ".contact-cta a"]
    let tl;
    staggers.forEach(el => {
        gsap.set(el, { autoAlpha: 0, x: -50 })
    })

    ScrollTrigger.batch(staggers, {
        onEnter: batch => {
            if (tl && tl.isActive()) {
                tl.to(batch, { autoAlpha: 1, x: 0, stagger: 0.2, delay: 0.3 })
            } else {
                tl = gsap.timeline().to(batch, { autoAlpha: 1, x: 0, stagger: 0.1, delay: 0.3 })
            }
        },
        once: true
    });
}


export function about() {
    let staggers = [".cv h4", ".cv p"]
    let tl;
    staggers.forEach(el => {
        gsap.set(el, { autoAlpha: 0, x: -50 })
    })

    ScrollTrigger.batch(staggers, {
        onEnter: batch => {
            if (tl && tl.isActive()) {
                tl.to(batch, { autoAlpha: 1, x: 0 })
            } else {
                tl = gsap.timeline().to(batch, { autoAlpha: 1, x: 0 })
            }
        },
        once: true
    });
}

export function project() {
    let staggers = [".projecten-container img", ".projecten-container h1", ".projecten-container p", ".projecten-container a", ".project-development h3", ".project-development li", ".project-tools h3", ".project-tools li"]
    let tl;
    staggers.forEach(el => {
        gsap.set(el, { autoAlpha: 0, x: -50 })
    })

    ScrollTrigger.batch(staggers, {
        onEnter: batch => {
            if (tl && tl.isActive()) {
                tl.to(batch, { autoAlpha: 1, x: 0, stagger: 0.2 })
            } else {
                tl = gsap.timeline().to(batch, { autoAlpha: 1, x: 0, stagger: 0.2 })
            }
        },
        once: true
    });
}