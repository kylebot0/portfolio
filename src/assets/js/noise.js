"use strict";
export default function() {
    const canvas = document.getElementsByTagName("canvas")[0];
    resizeCanvas();
    let config = { SIM_RESOLUTION: 128, DYE_RESOLUTION: 256, CAPTURE_RESOLUTION: 512, DENSITY_DISSIPATION: 3, VELOCITY_DISSIPATION: 0, PRESSURE: 0, PRESSURE_ITERATIONS: 20, CURL: 0, SPLAT_RADIUS: 2, SPLAT_FORCE: 8e3, SHADING: !1, COLORFUL: !1, COLOR_UPDATE_SPEED: 10, PAUSED: !1, BACK_COLOR: { r: 23, g: 24, b: 26 }, TRANSPARENT: !1, BLOOM: !1, BLOOM_ITERATIONS: 8, BLOOM_RESOLUTION: 256, BLOOM_INTENSITY: .8, BLOOM_THRESHOLD: .6, BLOOM_SOFT_KNEE: .7, SUNRAYS: !1, SUNRAYS_RESOLUTION: 196, SUNRAYS_WEIGHT: 1 };


    function pointerPrototype() { this.id = -1, this.texcoordX = 0, this.texcoordY = 0, this.prevTexcoordX = 0, this.prevTexcoordY = 0, this.deltaX = 0, this.deltaY = 0, this.down = !1, this.moved = !1, this.color = [30, 0, 300] }
    let pointers = [],
        splatStack = [];
    pointers.push(new pointerPrototype);
    const { gl: gl, ext: ext } = getWebGLContext(canvas);

    function getWebGLContext(e) {
        const r = { alpha: !0, depth: !1, stencil: !1, antialias: !1, preserveDrawingBuffer: !1 };
        let t = e.getContext("webgl2", r);
        const i = !!t;
        let n, o;
        i || (t = e.getContext("webgl", r) || e.getContext("experimental-webgl", r)), i ? (t.getExtension("EXT_color_buffer_float"), o = t.getExtension("OES_texture_float_linear")) : (n = t.getExtension("OES_texture_half_float"), o = t.getExtension("OES_texture_half_float_linear")), t.clearColor(0, 0, 0, 1);
        const a = i ? t.HALF_FLOAT : n.HALF_FLOAT_OES;
        let l, u, c;
        return i ? (l = getSupportedFormat(t, t.RGBA16F, t.RGBA, a), u = getSupportedFormat(t, t.RG16F, t.RG, a), c = getSupportedFormat(t, t.R16F, t.RED, a)) : (l = getSupportedFormat(t, t.RGBA, t.RGBA, a), u = getSupportedFormat(t, t.RGBA, t.RGBA, a), c = getSupportedFormat(t, t.RGBA, t.RGBA, a)), { gl: t, ext: { formatRGBA: l, formatRG: u, formatR: c, halfFloatTexType: a, supportLinearFiltering: o } }
    }

    function getSupportedFormat(e, r, t, i) {
        if (!supportRenderTextureFormat(e, r, t, i)) switch (r) {
            case e.R16F:
                return getSupportedFormat(e, e.RG16F, e.RG, i);
            case e.RG16F:
                return getSupportedFormat(e, e.RGBA16F, e.RGBA, i);
            default:
                return null
        }
        return { internalFormat: r, format: t }
    }

    function supportRenderTextureFormat(e, r, t, i) {
        let n = e.createTexture();
        e.bindTexture(e.TEXTURE_2D, n), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texImage2D(e.TEXTURE_2D, 0, r, 4, 4, 0, t, i, null);
        let o = e.createFramebuffer();
        return e.bindFramebuffer(e.FRAMEBUFFER, o), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, n, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) == e.FRAMEBUFFER_COMPLETE
    }

    function isMobile() { return /Mobi|Android/i.test(navigator.userAgent) }
    isMobile() && (config.DYE_RESOLUTION = 128, config.DENSITY_DISSIPATION = 3), ext.supportLinearFiltering || (config.DYE_RESOLUTION = 256, config.SHADING = !1, config.BLOOM = !1, config.SUNRAYS = !1);
    class Material {
        constructor(e, r) { this.vertexShader = e, this.fragmentShaderSource = r, this.programs = [], this.activeProgram = null, this.uniforms = [] }
        setKeywords(e) {
            let r = 0;
            for (let t = 0; t < e.length; t++) r += hashCode(e[t]);
            let t = this.programs[r];
            if (null == t) {
                let i = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, e);
                t = createProgram(this.vertexShader, i), this.programs[r] = t
            }
            t != this.activeProgram && (this.uniforms = getUniforms(t), this.activeProgram = t)
        }
        bind() { gl.useProgram(this.activeProgram) }
    }
    class Program {
        constructor(e, r) { this.uniforms = {}, this.program = createProgram(e, r), this.uniforms = getUniforms(this.program) }
        bind() { gl.useProgram(this.program) }
    }

    function createProgram(e, r) { let t = gl.createProgram(); return gl.attachShader(t, e), gl.attachShader(t, r), gl.linkProgram(t), gl.getProgramParameter(t, gl.LINK_STATUS) || console.trace(gl.getProgramInfoLog(t)), t }

    function getUniforms(e) {
        let r = [],
            t = gl.getProgramParameter(e, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < t; i++) {
            let t = gl.getActiveUniform(e, i).name;
            r[t] = gl.getUniformLocation(e, t)
        }
        return r
    }

    function compileShader(e, r, t) { r = addKeywords(r, t); const i = gl.createShader(e); return gl.shaderSource(i, r), gl.compileShader(i), gl.getShaderParameter(i, gl.COMPILE_STATUS) || console.trace(gl.getShaderInfoLog(i)), i }

    function addKeywords(e, r) { if (null == r) return e; let t = ""; return r.forEach(e => { t += "#define " + e + "\n" }), t + e }
    const baseVertexShader = compileShader(gl.VERTEX_SHADER, "\n    precision highp float;\n\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform vec2 texelSize;\n\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        vL = vUv - vec2(texelSize.x, 0.0);\n        vR = vUv + vec2(texelSize.x, 0.0);\n        vT = vUv + vec2(0.0, texelSize.y);\n        vB = vUv - vec2(0.0, texelSize.y);\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n"),
        clearShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float value;\n\n    void main () {\n        gl_FragColor = value * texture2D(uTexture, vUv);\n    }\n"),
        checkerboardShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float aspectRatio;\n\n    #define SCALE 25.0\n\n    void main () {\n        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));\n        float v = mod(uv.x + uv.y, 2.0);\n        v = v * 0.1 + 0.8;\n        gl_FragColor = vec4(vec3(v), 1.0);\n    }\n"),
        displayShaderSource = "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform sampler2D uBloom;\n    uniform sampler2D uSunrays;\n    uniform sampler2D uDithering;\n    uniform vec2 ditherScale;\n    uniform vec2 texelSize;\n\n    vec3 linearToGamma (vec3 color) {\n        color = max(color, vec3(0));\n        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\n    }\n\n    void main () {\n        vec3 c = texture2D(uTexture, vUv).rgb;\n\n    #ifdef SHADING\n        vec3 lc = texture2D(uTexture, vL).rgb;\n        vec3 rc = texture2D(uTexture, vR).rgb;\n        vec3 tc = texture2D(uTexture, vT).rgb;\n        vec3 bc = texture2D(uTexture, vB).rgb;\n\n        float dx = length(rc) - length(lc);\n        float dy = length(tc) - length(bc);\n\n        vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n        vec3 l = vec3(0.0, 0.0, 1.0);\n\n        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n        c *= diffuse;\n    #endif\n\n    #ifdef BLOOM\n        vec3 bloom = texture2D(uBloom, vUv).rgb;\n    #endif\n\n    #ifdef SUNRAYS\n        float sunrays = texture2D(uSunrays, vUv).r;\n        c *= sunrays;\n    #ifdef BLOOM\n        bloom *= sunrays;\n    #endif\n    #endif\n\n    #ifdef BLOOM\n        float noise = texture2D(uDithering, vUv * ditherScale).r;\n        noise = noise * 2.0 - 1.0;\n        bloom += noise / 255.0;\n        bloom = linearToGamma(bloom);\n        c += bloom;\n    #endif\n\n        float a = max(c.r, max(c.g, c.b));\n        gl_FragColor = vec4(c, a);\n    }\n",
        splatShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTarget;\n    uniform float aspectRatio;\n    uniform vec3 color;\n    uniform vec2 point;\n    uniform float radius;\n\n    void main () {\n        vec2 p = vUv - point.xy;\n        p.x *= aspectRatio;\n        vec3 splat = exp(-dot(p, p) / radius) * color;\n        vec3 base = texture2D(uTarget, vUv).xyz;\n        gl_FragColor = vec4(base + splat, 1.0);\n    }\n"),
        advectionShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform vec2 dyeTexelSize;\n    uniform float dt;\n    uniform float dissipation;\n\n    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n        vec2 st = uv / tsize - 0.5;\n\n        vec2 iuv = floor(st);\n        vec2 fuv = fract(st);\n\n        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n\n        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n    }\n\n    void main () {\n    #ifdef MANUAL_FILTERING\n        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n        vec4 result = bilerp(uSource, coord, dyeTexelSize);\n    #else\n        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n        vec4 result = texture2D(uSource, coord);\n    #endif\n        float decay = 1.0 + dissipation * dt;\n        gl_FragColor = result / decay;\n    }", ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]),
        divergenceShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).x;\n        float R = texture2D(uVelocity, vR).x;\n        float T = texture2D(uVelocity, vT).y;\n        float B = texture2D(uVelocity, vB).y;\n\n        vec2 C = texture2D(uVelocity, vUv).xy;\n        if (vL.x < 0.0) { L = -C.x; }\n        if (vR.x > 1.0) { R = -C.x; }\n        if (vT.y > 1.0) { T = -C.y; }\n        if (vB.y < 0.0) { B = -C.y; }\n\n        float div = 0.5 * (R - L + T - B);\n        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n    }\n"),
        curlShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).y;\n        float R = texture2D(uVelocity, vR).y;\n        float T = texture2D(uVelocity, vT).x;\n        float B = texture2D(uVelocity, vB).x;\n        float vorticity = R - L - T + B;\n        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n    }\n"),
        vorticityShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uCurl;\n    uniform float curl;\n    uniform float dt;\n\n    void main () {\n        float L = texture2D(uCurl, vL).x;\n        float R = texture2D(uCurl, vR).x;\n        float T = texture2D(uCurl, vT).x;\n        float B = texture2D(uCurl, vB).x;\n        float C = texture2D(uCurl, vUv).x;\n\n        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n        force /= length(force) + 0.0001;\n        force *= curl * C;\n        force.y *= -1.0;\n\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity += force * dt;\n        velocity = min(max(velocity, -1000.0), 1000.0);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n"),
        pressureShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uDivergence;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        float C = texture2D(uPressure, vUv).x;\n        float divergence = texture2D(uDivergence, vUv).x;\n        float pressure = (L + R + B + T - divergence) * 0.25;\n        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n    }\n"),
        gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity.xy -= vec2(R - L, T - B);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n"),
        copyShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n\n    void main () {\n        gl_FragColor = texture2D(uTexture, vUv);\n    }\n"),
        blit = (() => (gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()), gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW), gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()), gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW), gl.vertexAttribPointer(0, 2, gl.FLOAT, !1, 0, 0), gl.enableVertexAttribArray(0), (e, r = !1) => { null == e ? (gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight), gl.bindFramebuffer(gl.FRAMEBUFFER, null)) : (gl.viewport(0, 0, e.width, e.height), gl.bindFramebuffer(gl.FRAMEBUFFER, e.fbo)), r && (gl.clearColor(0, 0, 0, 1), gl.clear(gl.COLOR_BUFFER_BIT)), gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0) }))();
    let dye, velocity, divergence, curl, pressure
    const clearProgram = new Program(baseVertexShader, clearShader),
        copyProgram = new Program(baseVertexShader, copyShader),
        checkerboardProgram = new Program(baseVertexShader, checkerboardShader),
        splatProgram = new Program(baseVertexShader, splatShader),
        advectionProgram = new Program(baseVertexShader, advectionShader),
        divergenceProgram = new Program(baseVertexShader, divergenceShader),
        curlProgram = new Program(baseVertexShader, curlShader),
        vorticityProgram = new Program(baseVertexShader, vorticityShader),
        pressureProgram = new Program(baseVertexShader, pressureShader),
        gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader),
        displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function initFramebuffers() {
        let e = getResolution(config.SIM_RESOLUTION),
            r = getResolution(config.DYE_RESOLUTION);
        const t = ext.halfFloatTexType,
            i = ext.formatRGBA,
            n = ext.formatRG,
            o = ext.formatR,
            a = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        gl.disable(gl.BLEND), dye = null == dye ? createDoubleFBO(r.width, r.height, i.internalFormat, i.format, t, a) : resizeDoubleFBO(dye, r.width, r.height, i.internalFormat, i.format, t, a), velocity = null == velocity ? createDoubleFBO(e.width, e.height, n.internalFormat, n.format, t, a) : resizeDoubleFBO(velocity, e.width, e.height, n.internalFormat, n.format, t, a), divergence = createFBO(e.width, e.height, o.internalFormat, o.format, t, gl.NEAREST), curl = createFBO(e.width, e.height, o.internalFormat, o.format, t, gl.NEAREST), pressure = createDoubleFBO(e.width, e.height, o.internalFormat, o.format, t, gl.NEAREST)
    }

    function createFBO(e, r, t, i, n, o) {
        gl.activeTexture(gl.TEXTURE0);
        let a = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, a), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, o), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, o), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.texImage2D(gl.TEXTURE_2D, 0, t, e, r, 0, i, n, null);
        let l = gl.createFramebuffer();
        return gl.bindFramebuffer(gl.FRAMEBUFFER, l), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, a, 0), gl.viewport(0, 0, e, r), gl.clear(gl.COLOR_BUFFER_BIT), { texture: a, fbo: l, width: e, height: r, texelSizeX: 1 / e, texelSizeY: 1 / r, attach: e => (gl.activeTexture(gl.TEXTURE0 + e), gl.bindTexture(gl.TEXTURE_2D, a), e) }
    }

    function createDoubleFBO(e, r, t, i, n, o) {
        let a = createFBO(e, r, t, i, n, o),
            l = createFBO(e, r, t, i, n, o);
        return {
            width: e,
            height: r,
            texelSizeX: a.texelSizeX,
            texelSizeY: a.texelSizeY,
            get read() { return a },
            set read(e) { a = e },
            get write() { return l },
            set write(e) { l = e },
            swap() {
                let e = a;
                a = l, l = e
            }
        }
    }

    function resizeFBO(e, r, t, i, n, o, a) { let l = createFBO(r, t, i, n, o, a); return copyProgram.bind(), gl.uniform1i(copyProgram.uniforms.uTexture, e.attach(0)), blit(l), l }

    function resizeDoubleFBO(e, r, t, i, n, o, a) { return e.width == r && e.height == t ? e : (e.read = resizeFBO(e.read, r, t, i, n, o, a), e.write = createFBO(r, t, i, n, o, a), e.width = r, e.height = t, e.texelSizeX = 1 / r, e.texelSizeY = 1 / t, e) }

    function createTextureAsync(e) {
        let r = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, r), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));
        let t = { texture: r, width: 1, height: 1, attach: e => (gl.activeTexture(gl.TEXTURE0 + e), gl.bindTexture(gl.TEXTURE_2D, r), e) },
            i = new Image;
        return i.onload = (() => { t.width = i.width, t.height = i.height, gl.bindTexture(gl.TEXTURE_2D, r), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, i) }), i.src = e, t
    }

    function updateKeywords() {
        let e = [];
        config.SHADING && e.push("SHADING"), config.BLOOM && e.push("BLOOM"), config.SUNRAYS && e.push("SUNRAYS"), displayMaterial.setKeywords(e)
    }
    updateKeywords(), initFramebuffers();
    let lastUpdateTime = Date.now(),
        colorUpdateTimer = 0;

    function update() {
        const e = calcDeltaTime();
        resizeCanvas() && initFramebuffers(), applyInputs(), config.PAUSED || step(e), render(null), requestAnimationFrame(update)
    }

    function calcDeltaTime() {
        let e = Date.now(),
            r = (e - lastUpdateTime) / 1e3;
        return r = Math.min(r, .016666), lastUpdateTime = e, r
    }

    function resizeCanvas() {
        let e = scaleByPixelRatio(canvas.clientWidth),
            r = scaleByPixelRatio(canvas.clientHeight);
        return (canvas.width != e || canvas.height != r) && (canvas.width = e, canvas.height = r, !0)
    }

    function multipleSplats(e) {
        for (let r = 0; r < e; r++) {
            const e = generateColor();
            e.r *= 10, e.g *= 10, e.b *= 10, splat(Math.random(), Math.random(), 100 * (Math.random() - .5), 400 * (Math.random() - .5), e)
        }
    }

    function applyInputs() { splatStack.length > 0 && multipleSplats(splatStack.pop()), pointers.forEach(e => { e.moved && (e.moved = !1, splatPointer(e)) }) }

    function step(e) {
        gl.disable(gl.BLEND), curlProgram.bind(), gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0)), blit(curl), vorticityProgram.bind(), gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0)), gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1)), gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL), gl.uniform1f(vorticityProgram.uniforms.dt, e), blit(velocity.write), velocity.swap(), divergenceProgram.bind(), gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0)), blit(divergence), clearProgram.bind(), gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0)), gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE), blit(pressure.write), pressure.swap(), pressureProgram.bind(), gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
        for (let e = 0; e < config.PRESSURE_ITERATIONS; e++) gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1)), blit(pressure.write), pressure.swap();
        gradienSubtractProgram.bind(), gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0)), gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1)), blit(velocity.write), velocity.swap(), advectionProgram.bind(), gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), ext.supportLinearFiltering || gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
        let r = velocity.read.attach(0);
        gl.uniform1i(advectionProgram.uniforms.uVelocity, r), gl.uniform1i(advectionProgram.uniforms.uSource, r), gl.uniform1f(advectionProgram.uniforms.dt, e), gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION), blit(velocity.write), velocity.swap(), ext.supportLinearFiltering || gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY), gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0)), gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1)), gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION), blit(dye.write), dye.swap()
    }

    function render(e) { null != e && config.TRANSPARENT || (gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA), gl.enable(gl.BLEND)), drawDisplay(e) }

    function drawDisplay(e) {
        null == e ? gl.drawingBufferWidth : e.width, null == e ? gl.drawingBufferHeight : e.height;
        displayMaterial.bind(), gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0)), blit(e)
    }

    function applySunrays(e, r, t) { gl.disable(gl.BLEND), sunraysMaskProgram.bind(), gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, e.attach(0)), blit(r), sunraysProgram.bind(), gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT), gl.uniform1i(sunraysProgram.uniforms.uTexture, r.attach(0)), blit(t) }

    function blur(e, r, t) { blurProgram.bind(); for (let i = 0; i < t; i++) gl.uniform2f(blurProgram.uniforms.texelSize, e.texelSizeX, 0), gl.uniform1i(blurProgram.uniforms.uTexture, e.attach(0)), blit(r), gl.uniform2f(blurProgram.uniforms.texelSize, 0, e.texelSizeY), gl.uniform1i(blurProgram.uniforms.uTexture, r.attach(0)), blit(e) }

    function splatPointer(e) {
        let r = e.deltaX * config.SPLAT_FORCE,
            t = e.deltaY * config.SPLAT_FORCE;
        splat(e.texcoordX, e.texcoordY, r, t, e.color)
    }

    function splatPointer2(e) {
        let r = e.deltaX * config.SPLAT_FORCE,
            t = e.deltaY * config.SPLAT_FORCE;
        splat2(e.texcoordX, e.texcoordY, r, t, e.color)
    }

    function splat(e, r, t, i, n) { splatProgram.bind(), gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(1)), gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height), gl.uniform2f(splatProgram.uniforms.point, e, r), gl.uniform3f(splatProgram.uniforms.color, t, i, 0), gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 150)), blit(velocity.write), velocity.swap(), gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0)), gl.uniform3f(splatProgram.uniforms.color, .03, .03, .03), blit(dye.write), dye.swap() }

    function splat2(e, r, t, i, n) { splatProgram.bind(), gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0)), gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height), gl.uniform2f(splatProgram.uniforms.point, e, r), gl.uniform3f(splatProgram.uniforms.color, t, i, 0), gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 25e3)), blit(velocity.write), velocity.swap(), gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0)), gl.uniform3f(splatProgram.uniforms.color, .015, .015, .015), blit(dye.write), dye.swap() }

    function correctRadius(e) { let r = canvas.width / canvas.height; return r > 1 && (e *= r), e }
    var lastClientX, lastClientY;
    update(), window.addEventListener("mousemove", function(e) {
        if (lastClientX === e.clientX && lastClientY === e.clientY) return;
        lastClientX = e.clientX, lastClientY = e.clientY, updatePointerMoveData(pointers[0], scaleByPixelRatio(lastClientX), scaleByPixelRatio(lastClientY))
    }, !1);
    var timeoutId2 = 0,
        timeout2 = 0,
        timeout3 = 0,
        timeoutload2 = 0,
        count2 = 0,
        count3 = 0;

    function myFunction2() { clearInterval(timeout2), clearInterval(timeout3), clearTimeout(timeoutload2), clearTimeout(timeoutId2), count2 = 0, count3 = 0, config.VELOCITY_DISSIPATION = 0, config.SPLAT_RADIUS = 2 }

    function updatePointerMoveData(e, r, t) { e.prevTexcoordX = e.texcoordX, e.prevTexcoordY = e.texcoordY, e.texcoordX = r / canvas.width, e.texcoordY = 1 - t / canvas.height, e.deltaX = correctDeltaX(e.texcoordX - e.prevTexcoordX), e.deltaY = correctDeltaY(e.texcoordY - e.prevTexcoordY), e.moved = Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0 }

    function correctDeltaX(e) { let r = canvas.width / canvas.height; return r < 1 && (e *= r), e }

    function correctDeltaY(e) { let r = canvas.width / canvas.height; return r > 1 && (e /= r), e }

    function generateColor() { let e = HSVtoRGB(.1, 1, 1); return e.r *= .25, e.g *= .16, e.b *= .16, e }

    function HSVtoRGB(e, r, t) {
        let i, n, o, a, l, u, c, g;
        switch (u = t * (1 - r), c = t * (1 - (l = 6 * e - (a = Math.floor(6 * e))) * r), g = t * (1 - (1 - l) * r), a % 6) {
            case 0:
                i = t, n = g, o = u;
                break;
            case 1:
                i = c, n = t, o = u;
                break;
            case 2:
                i = u, n = t, o = g;
                break;
            case 3:
                i = u, n = c, o = t;
                break;
            case 4:
                i = g, n = u, o = t;
                break;
            case 5:
                i = t, n = u, o = c
        }
        return { r: i, g: n, b: o }
    }

    function normalizeColor(e) { return { r: e.r / 255, g: e.g / 255, b: e.b / 255 } }

    function wrap(e, r, t) { let i = t - r; return 0 == i ? r : (e - r) % i + r }

    function getResolution(e) {
        let r = gl.drawingBufferWidth / gl.drawingBufferHeight;
        r < 1 && (r = 1 / r);
        let t = Math.round(e),
            i = Math.round(e * r);
        return gl.drawingBufferWidth > gl.drawingBufferHeight ? { width: i, height: t } : { width: t, height: i }
    }

    function getTextureScale(e, r, t) { return { x: r / e.width, y: t / e.height } }

    function scaleByPixelRatio(e) { let r = window.devicePixelRatio || 1; return Math.floor(e * r) }

    function hashCode(e) { if (0 == e.length) return 0; let r = 0; for (let t = 0; t < e.length; t++) r = (r << 5) - r + e.charCodeAt(t), r |= 0; return r }
}