import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const SEND_ORDER_URL = 'https://functions.poehali.dev/5bc4e0e5-6e34-4c56-aa8f-a6993b037c1f';

const HERO_IMG = 'https://cdn.poehali.dev/projects/d92c5a4a-128e-4d75-83e1-2ceff391e004/files/52af8c77-9761-4709-966a-2de58961feea.jpg';
const WORK_LAPTOP = 'https://cdn.poehali.dev/projects/d92c5a4a-128e-4d75-83e1-2ceff391e004/files/31df470f-1614-43c4-99b1-fce873ba6329.jpg';
const WORK_PHONE = 'https://cdn.poehali.dev/projects/d92c5a4a-128e-4d75-83e1-2ceff391e004/files/890a0ffe-646a-459f-a67b-3fabe892270a.jpg';

const NAV = [
  { id: 'about', label: 'О сервисе' },
  { id: 'services', label: 'Услуги' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'prices', label: 'Прайс' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

const SERVICES = [
  { icon: 'Laptop', title: 'Ремонт ноутбуков', desc: 'Замена матриц, клавиатур, чистка от пыли, восстановление после залития.' },
  { icon: 'Monitor', title: 'Ремонт ПК', desc: 'Диагностика, апгрейд, сборка, устранение перегрева и сбоев.' },
  { icon: 'Smartphone', title: 'Смартфоны и планшеты', desc: 'Замена экранов, аккумуляторов, разъёмов, восстановление плат.' },
  { icon: 'HardDrive', title: 'Восстановление данных', desc: 'Спасаем файлы с HDD, SSD и флешек даже после поломки.' },
  { icon: 'Cpu', title: 'BGA пайка', desc: 'Профессиональный ремонт материнских плат на компонентном уровне.' },
  { icon: 'ShieldCheck', title: 'Удаление вирусов', desc: 'Чистка системы, настройка ПО, защита от повторного заражения.' },
];

const PORTFOLIO = [
  { img: WORK_LAPTOP, tag: 'Ноутбук', title: 'Замена матрицы ASUS ZenBook', time: '2 часа' },
  { img: WORK_PHONE, tag: 'Смартфон', title: 'Замена экрана iPhone 13', time: '40 минут' },
  { img: HERO_IMG, tag: 'Материнская плата', title: 'Реболл чипа на MacBook Pro', time: '1 день' },
];

const PRICES = [
  { name: 'Диагностика', price: 'Бесплатно', note: 'при ремонте у нас' },
  { name: 'Чистка ноутбука от пыли', price: 'от 1 200 ₽', note: 'с заменой термопасты' },
  { name: 'Замена экрана смартфона', price: 'от 2 500 ₽', note: 'зависит от модели' },
  { name: 'Замена аккумулятора', price: 'от 1 500 ₽', note: 'оригинал/аналог' },
  { name: 'Установка Windows + ПО', price: 'от 1 000 ₽', note: 'с драйверами' },
  { name: 'Восстановление данных', price: 'от 2 000 ₽', note: 'оплата за результат' },
  { name: 'Ремонт после залития', price: 'от 3 000 ₽', note: 'после диагностики' },
  { name: 'Реболл / замена чипа', price: 'от 4 500 ₽', note: 'компонентный ремонт' },
];

const YANDEX_ORG_ID = '1012869153';
const YANDEX_REVIEWS_URL = `https://yandex.ru/maps/org/okey_kompyuter/${YANDEX_ORG_ID}/reviews/`;
const YANDEX_WIDGET_SRC = `https://yandex.ru/maps-reviews-widget/${YANDEX_ORG_ID}?comments`;

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState('success');
        setForm({ name: '', phone: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('about')} className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
              <Icon name="MonitorSmartphone" size={20} />
            </span>
            <span className="font-display font-bold text-lg tracking-wide uppercase">
              Окей<span className="text-primary">Компьютер</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+79996319313" className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors">
              <Icon name="Phone" size={16} className="text-primary" />
              +7 (999) 631-93-13
            </a>
            <Button onClick={() => scrollTo('contacts')} className="hidden sm:inline-flex font-semibold">Заявка</Button>
            <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-3 animate-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left py-1.5 text-muted-foreground hover:text-primary">
                {n.label}
              </button>
            ))}
            <Button onClick={() => scrollTo('contacts')} className="mt-2 font-semibold">Оставить заявку</Button>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="about" className="relative pt-32 pb-24 grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="float-up">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-primary pulse-ring" />
              Сервис №1 в Краснодаре
            </span>
            <h1 className="mt-6 font-display font-bold text-5xl md:text-7xl leading-[0.95] uppercase">
              Ремонт цифровой<br />
              <span className="text-primary text-glow">техники</span> на отлично
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Чиним ноутбуки, ПК, смартфоны и планшеты. Бесплатная диагностика, прозрачные цены и гарантия на каждую работу.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('contacts')} className="font-semibold h-12 px-7">
                <Icon name="Wrench" size={18} className="mr-2" /> Починить технику
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('prices')} className="font-semibold h-12 px-7 border-border">
                Узнать цены
              </Button>
            </div>
            <div className="mt-10 flex gap-8">
              {[['12 000+', 'ремонтов'], ['8 лет', 'на рынке'], ['98%', 'довольных']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-3xl text-primary">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="float-up" style={{ animationDelay: '.15s' }}>
            <div className="relative rounded-2xl overflow-hidden border border-border glow-card">
              <img src={HERO_IMG} alt="Ремонт техники" className="w-full h-[460px] object-cover" />
              <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-background/70 rounded-xl border border-border p-4 flex items-center gap-3">
                <Icon name="Clock" size={22} className="text-primary" />
                <div>
                  <div className="font-semibold">Срочный ремонт за 30 минут</div>
                  <div className="text-sm text-muted-foreground">Большинство поломок решаем при вас</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="container">
          <SectionHead kicker="Что мы делаем" title="Услуги сервиса" kickerSize="lg" titleSize="sm" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="glow-card rounded-2xl border border-border bg-card p-7">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-5">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="font-display font-semibold text-xl uppercase tracking-wide">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-card/40 border-y border-border">
        <div className="container">
          <SectionHead kicker="Наши работы" title="Примеры ремонтов" kickerSize="lg" titleSize="sm" />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p) => (
              <div key={p.title} className="group glow-card rounded-2xl overflow-hidden border border-border bg-card">
                <div className="relative h-56 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wide bg-primary text-primary-foreground rounded-full px-3 py-1">{p.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg uppercase">{p.title}</h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Timer" size={16} className="text-primary" /> Срок: {p.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24">
        <div className="container">
          <SectionHead kicker="Прозрачно" title="Средние цены по Краснодару" kickerSize="lg" titleSize="sm" />
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {PRICES.map((p) => (
              <div key={p.name} className="flex items-center justify-between gap-4 glow-card rounded-xl border border-border bg-card px-6 py-5">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.note}</div>
                </div>
                <div className="font-display font-bold text-xl text-primary whitespace-nowrap">{p.price}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground text-center">Итоговая стоимость определяется после бесплатной диагностики.</p>
        </div>
      </section>

      {/* WARRANTY */}
      <section className="py-24 bg-card/40 border-y border-border">
        <div className="container">
          <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-10 md:p-14 overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-10">
              <Icon name="ShieldCheck" size={220} className="text-primary" />
            </div>
            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <Icon name="BadgeCheck" size={16} /> Гарантия
              </span>
              <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl uppercase leading-tight">
                Гарантия до <span className="text-primary">12 месяцев</span> на все работы
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Мы официально отвечаем за качество ремонта. Если проблема повторится в гарантийный срок — устраним бесплатно. Выдаём чек и гарантийный талон на каждую услугу.
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-5">
                {[
                  ['FileCheck', 'Гарантийный талон', 'на каждый ремонт'],
                  ['RefreshCw', 'Бесплатный повтор', 'если поломка вернулась'],
                  ['PackageCheck', 'Оригинальные детали', 'с гарантией поставщика'],
                ].map(([icon, t, d]) => (
                  <div key={t} className="flex gap-3">
                    <Icon name={icon} size={22} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">{t}</div>
                      <div className="text-sm text-muted-foreground">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24">
        <div className="container">
          <SectionHead kicker="Нам доверяют" title="Отзывы клиентов" kickerSize="lg" titleSize="sm" />
          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} className="text-primary" /> Реальные отзывы с Яндекс Карт
            </span>
          </div>

          <div className="mt-10 mx-auto max-w-3xl rounded-2xl border border-border bg-card overflow-hidden glow-card">
            <iframe
              title="Отзывы Окей Компьютер на Яндекс Картах"
              src={YANDEX_WIDGET_SRC}
              className="w-full h-[560px] border-0"
              loading="lazy"
            />
          </div>

          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="outline" className="font-semibold h-12 px-7 border-border">
              <a href={YANDEX_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                <Icon name="ExternalLink" size={18} className="mr-2" /> Все отзывы на Яндекс Картах
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-card/40 border-t border-border">
        <div className="container">
          <SectionHead kicker="Свяжитесь с нами" title="Контакты" kickerSize="lg" titleSize="sm" />

          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            {/* Left: info + form */}
            <div className="flex flex-col gap-8">
              <div className="rounded-2xl border border-border bg-card p-8 space-y-5">
                <a href="https://yandex.ru/maps/org/okey_kompyuter/1012869153/" target="_blank" rel="noopener noreferrer" className="flex gap-4 group">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Icon name="MapPin" size={20} />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">Адрес</div>
                    <div className="font-semibold text-lg group-hover:text-primary transition-colors">г. Краснодар, ул. Тургенева, 148</div>
                  </div>
                </a>

                <div className="flex gap-4">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Icon name="Phone" size={20} />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">Телефон</div>
                    <a href="tel:+79996319313" className="block font-semibold text-lg hover:text-primary transition-colors">+7 (999) 631-93-13</a>
                    <a href="tel:+79034585385" className="block font-semibold text-lg hover:text-primary transition-colors">+7 (903) 458-53-85</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Icon name="Clock" size={20} />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">Часы работы</div>
                    <div className="font-semibold text-lg">Пн — Пт: 09:00 – 19:00</div>
                    <div className="font-semibold text-lg">Суббота: 10:00 – 17:00</div>
                    <div className="font-semibold text-lg text-muted-foreground">Воскресенье: выходной</div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button asChild variant="outline" className="w-full font-semibold border-border">
                    <a href="https://yandex.ru/maps/org/okey_kompyuter/1012869153/" target="_blank" rel="noopener noreferrer">
                      <Icon name="Map" size={16} className="mr-2" /> Открыть на Яндекс Картах
                    </a>
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8">
                <h3 className="font-display font-semibold text-2xl uppercase">Оставить заявку</h3>
                <p className="mt-2 text-muted-foreground">Перезвоним за 10 минут и бесплатно проконсультируем.</p>
                <div className="mt-6 space-y-4">
                  <input
                    placeholder="Ваше имя *"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-12 rounded-xl bg-secondary border border-border px-4 outline-none focus:border-primary transition-colors"
                  />
                  <input
                    placeholder="Телефон *"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full h-12 rounded-xl bg-secondary border border-border px-4 outline-none focus:border-primary transition-colors"
                  />
                  <textarea
                    placeholder="Что случилось с техникой?"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl bg-secondary border border-border px-4 py-3 outline-none focus:border-primary transition-colors resize-none"
                  />
                  {formState === 'success' && (
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <Icon name="CircleCheck" size={20} /> Заявка отправлена! Перезвоним скоро.
                    </div>
                  )}
                  {formState === 'error' && (
                    <div className="flex items-center gap-2 text-destructive font-semibold">
                      <Icon name="CircleAlert" size={20} /> Ошибка. Позвоните нам напрямую.
                    </div>
                  )}
                  <Button type="submit" size="lg" className="w-full font-semibold h-12" disabled={formState === 'loading'}>
                    {formState === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right: Yandex Map */}
            <div className="rounded-2xl border border-border overflow-hidden glow-card min-h-[500px] lg:min-h-0">
              <iframe
                title="Окей Компьютер на карте"
                src="https://yandex.ru/map-widget/v1/?ll=38.964469%2C45.066147&z=16&pt=38.964469,45.066147,pm2rdm&org=1012869153"
                className="w-full h-full min-h-[500px] border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <Icon name="MonitorSmartphone" size={18} />
            </span>
            <span className="font-display font-bold uppercase tracking-wide text-foreground">Окей Компьютер</span>
          </div>
          <p>© 2026 Окей Компьютер · Ремонт техники в Краснодаре</p>
        </div>
      </footer>
    </div>
  );
};

const SectionHead = ({ kicker, title, align = 'center', kickerSize = 'sm', titleSize = 'lg' }: { kicker: string; title: string; align?: 'center' | 'left'; kickerSize?: 'sm' | 'lg'; titleSize?: 'sm' | 'lg' }) => (
  <div className={align === 'center' ? 'text-center' : 'text-left'}>
    <span className={`font-semibold uppercase tracking-widest text-primary ${kickerSize === 'lg' ? 'text-2xl md:text-3xl' : 'text-xs'}`}>{kicker}</span>
    <h2 className={`mt-3 font-display font-bold uppercase ${titleSize === 'sm' ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl'}`}>{title}</h2>
  </div>
);

export default Index;