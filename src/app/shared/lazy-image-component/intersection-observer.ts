class Intersection {

    private observer: IntersectionObserver;

    private getObserver() {
        return new Promise((resolve, reject) => {
            if (this.observer == null && 'IntersectionObserver' in window) {
                this.observer = new IntersectionObserver((entries, self) => {
                    entries.forEach((entry: any) => {
                        if (entry.isIntersecting) {
                            self.unobserve(entry.target);
                            entry.target.callback();
                        }
                    });
                },
                    {
                        rootMargin: '50px',
                        threshold: 0
                    }
                );
            }
            if (!('IntersectionObserver' in window)) {
                return reject('IntersectionObserver not supported !');
            }
            return resolve(this.observer);
        });
    }

    observe(item, callback) {
        return this.getObserver().then((observer: IntersectionObserver) => {
            item.callback = callback;
            return observer.observe(item);
        });
    }

}

export const intersectionObserver = new Intersection();