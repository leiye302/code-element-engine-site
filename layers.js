(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initWorkflow = () => {
        const nodes = [...document.querySelectorAll('[data-workflow-node]')];
        const status = document.querySelector('[data-runtime-status]');
        const progress = document.querySelector('[data-runtime-progress]');
        if (!nodes.length || reducedMotion) return;

        const labels = [
            '解析自然语言目标',
            '生成场景状态',
            '定位目标对象',
            '推理路径与约束',
            '调用设备能力',
            '记录结果并沉淀技能'
        ];
        let index = 0;

        const advance = () => {
            nodes.forEach((node, nodeIndex) => node.classList.toggle('active', nodeIndex === index));
            if (status) status.textContent = labels[index];
            if (progress) progress.style.width = `${((index + 1) / nodes.length) * 100}%`;
            index = (index + 1) % nodes.length;
        };

        advance();
        window.setInterval(advance, 1450);
    };

    const initAdapter = () => {
        const cards = [...document.querySelectorAll('[data-mismatch]')];
        const state = document.querySelector('[data-adapter-state]');
        if (!cards.length || reducedMotion) return;

        const labels = [
            '正在转换 camera → robot 坐标',
            '正在统一 pixel / meter / rad',
            '正在补偿 delay / frequency'
        ];
        let index = 0;

        const advance = () => {
            cards.forEach((card, cardIndex) => card.classList.toggle('active', cardIndex === index));
            if (state) state.textContent = labels[index];
            index = (index + 1) % cards.length;
        };

        advance();
        window.setInterval(advance, 1750);
    };

    const initReveal = () => {
        const items = [...document.querySelectorAll('[data-reveal]')];
        if (!items.length) return;
        if (reducedMotion || !('IntersectionObserver' in window)) {
            items.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        items.forEach((item) => observer.observe(item));
    };

    initWorkflow();
    initAdapter();
    initReveal();
})();
