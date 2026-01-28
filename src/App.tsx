import { useState, useEffect } from 'react';
import { Star, MapPin, Clock, Phone, Instagram, ChevronRight, Sparkles, ChevronLeft, X } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from 'emailjs-com';


const APP_CONFIG = {
  restaurant: "Restaurant Le Dôme",
  city: "Annonay",
  cuisine: "Gastronomie Française d'Excellence",
  phone: "+33475670943",
  whatsapp: "+33475670943",
  instagram: "https://instagram.com/lecielétoilé",
  address: "15 Rue Montgolfier, 07100 Annonay",
  hours: {
    weekday: "Mar-Jeu: 12h-14h & 19h-22h",
    weekend: "Ven-Dim: 12h-14h & 19h-23h",
    closed: "Lundi fermé"
  },
  rating: 4.9,
  reviewCount: 156
};

function Hero() {
  const handleReservationClick = () => {
    document.getElementById('reservation')?.scrollIntoView();
  };

  const handleTakeoutClick = () => {
    const message = encodeURIComponent(`Bonjour, je souhaite commander chez ${APP_CONFIG.restaurant}`);
    window.open(`https://wa.me/${APP_CONFIG.whatsapp.replace(/\D/g, '')}?text=${message}`);
  };

  return (
    
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-6 flex justify-center" data-aos="fade-up">
          <Sparkles size={32} className="text-emerald-400" />
        </div>

        <h1 className="text-white mb-4 leading-tight" data-aos="fade-up" data-aos-delay="100">
          {APP_CONFIG.restaurant}
        </h1>

        <p className="text-xl md:text-2xl text-emerald-200 mb-2" data-aos="fade-up" data-aos-delay="200">
          {APP_CONFIG.cuisine}
        </p>

        <p className="text-lg text-emerald-100 mb-12" data-aos="fade-up" data-aos-delay="300">
          Une expérience raffinée à {APP_CONFIG.city}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16" data-aos="fade-up" data-aos-delay="400">
          <button
            onClick={handleReservationClick}
            className="btn-primary text-lg"
          >
            Réserver une table
          </button>
          <button
            onClick={handleTakeoutClick}
            className="btn-secondary text-lg"
          >
            Commander à emporter
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-12 mt-20" data-aos="fade-up" data-aos-delay="500">
          <div className="text-white text-center">
            <p className="text-4xl font-bold text-emerald-300">{APP_CONFIG.rating}</p>
            <div className="flex gap-1 justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-emerald-400 text-emerald-400" />
              ))}
            </div>
            <p className="text-sm text-emerald-100 mt-3">Sur {APP_CONFIG.reviewCount} avis</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    {
      name: "Marie Dupont",
      rating: 5,
      text: "Une expérience culinaire exeptionnelle. Chaque assiette est une œuvre d'art. Service impeccable."
    },
    {
      name: "Jean-Pierre Laurent",
      rating: 5,
      text: "Le meilleur restaurant d'Annonay ! Cuisine raffinée, ambiance élégante, accueil chaleureux.",
    },
    {
      name: "Sophie Mercier",
      rating: 5,
      text: "Une soirée magique. Les saveurs, la présentation, l'atmosphère... tout est parfait."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center mb-4 text-emerald-700" data-aos="fade-up">
          NOS CONVIVES PARLENT DE NOUS
        </h2>

        <h3 className="text-center text-3xl md:text-4xl font-bold mb-16 text-gray-900" data-aos="fade-up" data-aos-delay="100">
          L'excellence reconnue
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="review-card"
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-emerald-400 text-emerald-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">"{review.text}"</p>
              <p className="font-semibold text-gray-900 text-sm">— {review.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Excellence confirmée par {APP_CONFIG.reviewCount} clients - Note Google :
            <span className="font-bold text-emerald-700 ml-2">{APP_CONFIG.rating}/5</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const dishes = [
    {
      name: "Nems de rougets à la tapenade",
      category: "Entrées",
      description: "Salade composée, sauce vierge aux tomates confites et olives noires",
      image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
      price: "18€"
    },
    {
      name: "Salade Romaine au poulet croustillant",
      category: "Entrées",
      description: "Croûtons, copeaux de Parmesan, sauce César",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      price: "18€"
    },
    {
      name: "Risotto crémeux aux asperges vertes",
      category: "Plats",
      description: "Pecorino",
      image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
      price: "17€"
    },
    {
      name: "Gambas poêlées",
      category: "Plats",
      description: "Persillade citronnée",
      image: "https://images.pexels.com/photos/699544/pexels-photo-699544.jpeg",
      price: "21€"
    },
    {
      name: "Dessert du jour",
      category: "Desserts",
      description: "Selon l’inspiration du chef",
      image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
      price: "7,50€"
    },
    {
      name: "Crêpe Suzette",
      category: "Desserts",
      description: "Flambée au Grand Marnier, zestes d’orange confits",
      image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      price: "10€"
    }
  ];

  const filteredDishes =
    activeCategory === "Tous"
      ? dishes
      : dishes.filter(dish => dish.category === activeCategory);

  const handleOrderClick = () => {
    const message = encodeURIComponent(`Bonjour, je souhaite commander chez ${APP_CONFIG.restaurant}`);
    window.open(`https://wa.me/${APP_CONFIG.whatsapp.replace(/\D/g, '')}?text=${message}`);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center mb-4 text-emerald-700" data-aos="fade-up">
          NOS CRÉATIONS
        </h2>

        <h3 className="text-center text-3xl md:text-4xl font-bold mb-4 text-gray-900" data-aos="fade-up" data-aos-delay="100">
          Menu de Saison
        </h3>

        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Découvrez nos créations culinaires élaborées avec les meilleures matières premières et revisitées avec passion
        </p>
        <div className="sticky top-20 z-20 bg-gray-50 py-4 mb-12">
  <div className="flex justify-center gap-4 flex-wrap">
    {["Tous", "Entrées", "Plats", "Desserts"].map(cat => (
      <button
        key={cat}
        onClick={() => setActiveCategory(cat)}
        className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 ${
          activeCategory === cat
            ? "bg-emerald-700 text-white shadow-lg"
            : "bg-white border hover:bg-gray-100"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
</div>

        <div className="space-y-6 mb-16">
        {filteredDishes.map((dish, idx) => (

            <div
              key={idx}
              className="menu-item bg-white rounded-md p-8 border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center"
              data-aos="fade-up"
              data-aos-delay={100 + idx * 80}
            >
              <div className="w-full md:w-40 h-40 flex-shrink-0 rounded-md overflow-hidden shadow-lg">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{dish.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{dish.description}</p>
                <p className="text-emerald-700 font-bold text-lg">{dish.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" data-aos="fade-up">
          <button
            onClick={handleOrderClick}
            className="btn-primary inline-flex items-center gap-2"
          >
            Commander à emporter
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const gallery = [
    {
      image: "https://imgur.com/a/QvPqruJ",
      label: "Salle principale"
    },
    {
      image: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=600",
      label: "Plat signature"
    },
    {
      image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600",
      label: "Spécialités"
    },
    {
      image: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=600",
      label: "Notre cuisine"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center mb-4 text-emerald-700" data-aos="fade-up">
          AMBIANCE & ATMOSPHÈRE
        </h2>

        <h3 className="text-center text-3xl md:text-4xl font-bold mb-16 text-gray-900" data-aos="fade-up" data-aos-delay="100">
          Visite virtuelle
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className="gallery-item group relative overflow-hidden rounded-md h-64 md:h-80 cursor-pointer shadow-lg"
              data-aos="zoom-in"
              data-aos-delay={100 + idx * 100}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="image-overlay"></div>
              <div className="absolute inset-0 flex items-end p-8 z-10">
                <p className="text-white text-2xl font-bold">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center text-gray-700 mt-16 text-lg max-w-3xl mx-auto leading-relaxed"
          data-aos="fade-up"
        >
          Une atmosphère chaleureuse et élégante, où chaque détail reflète notre passion pour la gastronomie française d'excellence. Chaque visite au Ciel Étoilé est un moment privilégié, une parenthèse gourmande dans votre quotidien.
        </p>
      </div>
    </section>
  );
}

function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    people: '2',
    date: '',
    time: '19:30'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  emailjs.send(
    'service_9lcl3u7',
    'template_omusjgs',
    {
      name: formData.name,
      phone: formData.phone,
      people: formData.people,
      date: formData.date,
      time: formData.time,
    },
    'jCwTXOy00xq3Sza7P'
  )
  .then(() => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', people: '2', date: '', time: '19:30' });
    }, 3000);
  })
  .catch(err => {
    alert("Erreur lors de l'envoi");
    console.error(err);
  });
};

  return (
    <section id="reservation" className="py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-center mb-4 text-emerald-700" data-aos="fade-up">
          ACCÉDEZ À NOTRE TABLE
        </h2>

        <h3 className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-900" data-aos="fade-up" data-aos-delay="100">
          Réservez votre table
        </h3>

        {submitted ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
            <p className="text-green-700 text-lg font-semibold mb-2">
              ✓ Réservation confirmée !
            </p>
            <p className="text-green-600">
              Merci {formData.name}, nous vous attendons le {formData.date} à {formData.time}
            </p>
            <p className="text-sm text-green-600 mt-4">
              Un message de confirmation vous a été envoyé
            </p>
          </div>
        ) : (
<form
  name="reservation"
  method="POST"
  data-netlify="true"
  onSubmit={handleSubmit}
  className="space-y-6"
>
  <input type="hidden" name="form-name" value="reservation" />
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+33475670943"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nombre de personnes
                </label>
                <select
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  className="form-input"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n}>{n} {n > 1 ? 'personnes' : 'personne'}</option>
                    
                  ))}
                  <option value="10+">+10 personnes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Heure
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-input"
                >
                  {['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00', '12:30', '13:00', '13:30', '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                min={today}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="btn-primary w-full text-lg">
              Réserver maintenant
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
const today = new Date().toISOString().split("T")[0];

function InstagramSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Instagram size={48} className="mx-auto text-emerald-700 mb-6" data-aos="fade-down" />

        <h2 className="text-center mb-4 text-emerald-700" data-aos="fade-up">
          SUIVEZ NOS CRÉATIONS
        </h2>

        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900" data-aos="fade-up" data-aos-delay="100">
          Rejoignez notre communauté
        </h3>

        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Découvrez nos dernières créations culinaires, les coulisses de notre cuisine et les moments privilégiés partagés par nos convives
        </p>

        <a
          href={APP_CONFIG.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-3"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Instagram size={20} />
          Voir notre Instagram
        </a>
      </div>
    </section>
  );
}

function Location() {
  const handleCall = () => {
    window.location.href = `tel:${APP_CONFIG.phone}`;
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center mb-4 text-emerald-700" data-aos="fade-up">
          NOUS VOUS ACCUEILLONS
        </h2>

        <h3 className="text-center text-3xl md:text-4xl font-bold mb-16 text-gray-900" data-aos="fade-up" data-aos-delay="100">
          Nous trouver à Annonay
        </h3>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-6" data-aos="fade-right">
              <MapPin className="text-emerald-700 flex-shrink-0 mt-1" size={28} />
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-3">Adresse</h4>
                <p className="text-gray-700 leading-relaxed text-lg">{APP_CONFIG.address}</p>
              </div>
            </div>

            <div className="flex gap-6" data-aos="fade-right" data-aos-delay="100">
              <Clock className="text-emerald-700 flex-shrink-0 mt-1" size={28} />
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-3">Horaires d'ouverture</h4>
                <p className="text-gray-700 mb-2">{APP_CONFIG.hours.weekday}</p>
                <p className="text-gray-700 mb-2">{APP_CONFIG.hours.weekend}</p>
                <p className="text-gray-500 italic text-sm">{APP_CONFIG.hours.closed}</p>
              </div>
            </div>

            <div className="flex gap-6" data-aos="fade-right" data-aos-delay="200">
              <Phone className="text-emerald-700 flex-shrink-0 mt-1" size={28} />
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-3">Nous appeler</h4>
                <button
                  onClick={handleCall}
                  className="text-emerald-700 hover:text-emerald-800 font-bold text-lg transition-colors"
                >
                  {APP_CONFIG.phone}
                </button>
                <p className="text-gray-600 text-sm mt-2">Disponible pour vos réservations</p>
              </div>
            </div>
          </div>

          <div className="rounded-md overflow-hidden h-80 shadow-lg border border-gray-200" data-aos="fade-left">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2809.3738499830743!2d4.670177875746879!3d45.240232448355094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f5130993275905%3A0x96e7a8052759fe04!2sRestaurant%20Le%20D%C3%B4me!5e0!3m2!1sen!2stn!4v1769644129642!5m2!1sen!2stn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCTA() {
  const handleCall = () => {
    window.location.href = `tel:${APP_CONFIG.phone}`;
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40 md:hidden">
      <button
        onClick={handleCall}
        className="w-14 h-14 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Appeler"
        title="Appeler le restaurant"
      >
        <Phone size={24} />
      </button>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: false,
      easing: 'ease-out-cubic',
    });

    return () => {
      AOS.refreshHard();
    };
  }, []);

  return (
    <div className="bg-white">
      <Hero />
      <Reviews />
      <Menu />
      <Gallery />
      <Reservation />
      <InstagramSection />
      <Location />
      <FloatingCTA />
    </div>
  );
}
