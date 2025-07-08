/*
  ╭───────────────╮
  │  CelesteUI JS │ tiny helper – no deps, no fuss
  ╰───────────────╯
  usage:
	CelesteUI.showBanner(msg, type = 'info', position = 'top', duration = 3000)
	type     → 'info' | 'error' | 'success'
	position → 'top'  | 'bottom'
	duration → ms (0 = sticky)
*/
(function (global) {
	const createBanner = (msg, type, pos, sticky = false) => {
		const el = document.createElement('div');
		el.className = `banner banner--${type || 'info'}`;
		el.dataset.pos = pos || 'top';
		el.innerHTML = msg;

		if (sticky) {
			const btn = document.createElement('button');
			btn.className = 'banner__close';
			btn.innerHTML = '&times;';
			btn.title = 'Dismiss';
			// Absolutely position the close button
			btn.style.position = 'absolute';
			btn.style.color = 'var(--text-main, #FFF)';
			btn.style.top = '0.25em';
			btn.style.right = '0.5em';
			btn.style.background = 'none';
			btn.style.border = 'none';
			btn.style.fontSize = '1.5em';
			btn.style.cursor = 'pointer';
			btn.style.lineHeight = '1';
			btn.style.padding = '0';
			btn.onclick = () => {
				el.classList.remove('is-visible');
				el.addEventListener('transitionend', () => el.remove(), { once: true });
			};
			el.appendChild(btn);
		}

		return el;
	};

	const showBanner = (msg, type = 'info', position = 'top', duration = 3000) => {
		const sticky = duration === 0;
		const banner = createBanner(msg, type, position, sticky);
		document.body.appendChild(banner);
		void banner.offsetHeight;
		banner.classList.add('is-visible');

		if (!sticky) {
			setTimeout(() => {
				banner.classList.remove('is-visible');
				banner.addEventListener('transitionend', () => banner.remove(), { once: true });
			}, duration);
		}
	};

	window.CelesteUI = { showBanner };

})(window);
