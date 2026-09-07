import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaBriefcase,
  FaCheckCircle,
  FaTimes,
  FaCode,
  FaLaptopCode,
  FaTerminal,
  FaFileCode,
  FaCodeBranch,
  FaProjectDiagram,
  FaSitemap,
  FaCogs,
  FaTools,
  FaBug,
  FaDatabase,
  FaServer,
  FaCloud,
  FaGlobe,
  FaDesktop,
  FaMobileAlt,
  FaMicrochip,
  FaNetworkWired,
  FaGithub,
  FaPaintBrush,
  FaPalette,
  FaPenNib,
  FaDraftingCompass,
  FaPencilRuler,
  FaVectorSquare,
  FaObjectGroup,
  FaLayerGroup,
  FaImages,
  FaImage,
  FaCamera,
  FaCrop,
  FaBrush,
  FaMagic,
  FaBullhorn,
  FaBullseye,
  FaChartLine,
  FaChartBar,
  FaSearchDollar,
  FaAd,
  FaRocket,
  FaShareAlt,
  FaComments,
  FaEnvelope,
  FaUsers,
  FaUserFriends,
  FaTags,
  FaPercentage,
  FaThumbsUp,
  FaTrophy,
  FaShoppingCart,
  FaShoppingBag,
  FaStore,
  FaStoreAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaCashRegister,
  FaBox,
  FaBoxes,
  FaTruck,
  FaCartPlus,
  FaBuilding,
  FaHandshake,
  FaUsersCog,
  FaUserTie,
  FaTasks,
  FaClipboardCheck,
  FaCalendarCheck,
  FaClock,
  FaChartPie,
  FaChartArea,
  FaLightbulb,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaVideo,
  FaMicrophone,
  FaNewspaper,
  FaPen,
  FaFileAlt,
  FaCommentDots,
  FaLock,
  FaShieldAlt,
  FaKey,
  FaUserShield,
  FaCloudUploadAlt,
  FaWifi,
  FaStar,
  FaGem,
  FaAward,
  FaHeart,
  FaHeadset,
  FaPhone,
  FaEnvelopeOpen,
  FaQuestionCircle,
} from "react-icons/fa";

import { useServices } from "../../dashboard/context-dash/ServicesContext";

const iconOptions = [
  { name: "FaBullhorn", label: "Digital Marketing", icon: FaBullhorn },
  { name: "FaBullseye", label: "Target Marketing", icon: FaBullseye },
  { name: "FaSearchDollar", label: "SEO", icon: FaSearchDollar },
  { name: "FaAd", label: "Online Advertising", icon: FaAd },
  { name: "FaRocket", label: "Marketing Campaign", icon: FaRocket },
  { name: "FaChartLine", label: "Marketing Growth", icon: FaChartLine },
  { name: "FaChartBar", label: "Marketing Analytics", icon: FaChartBar },
  { name: "FaChartPie", label: "Marketing Reports", icon: FaChartPie },
  { name: "FaChartArea", label: "Business Growth", icon: FaChartArea },
  { name: "FaShareAlt", label: "Social Media", icon: FaShareAlt },
  { name: "FaFacebook", label: "Facebook Marketing", icon: FaFacebook },
  { name: "FaInstagram", label: "Instagram Marketing", icon: FaInstagram },
  { name: "FaYoutube", label: "YouTube Marketing", icon: FaYoutube },
  { name: "FaLinkedin", label: "LinkedIn Marketing", icon: FaLinkedin },
  { name: "FaTwitter", label: "Twitter Marketing", icon: FaTwitter },
  { name: "FaComments", label: "Community Engagement", icon: FaComments },
  { name: "FaCommentDots", label: "Audience Engagement", icon: FaCommentDots },
  { name: "FaUsers", label: "Target Audience", icon: FaUsers },
  { name: "FaUserFriends", label: "Community Marketing", icon: FaUserFriends },
  { name: "FaUsersCog", label: "Marketing Management", icon: FaUsersCog },
  { name: "FaEnvelope", label: "Email Marketing", icon: FaEnvelope },
  { name: "FaEnvelopeOpen", label: "Email Campaigns", icon: FaEnvelopeOpen },
  { name: "FaTags", label: "Offers & Promotions", icon: FaTags },
  { name: "FaPercentage", label: "Promotional Campaigns", icon: FaPercentage },
  { name: "FaThumbsUp", label: "Engagement", icon: FaThumbsUp },
  { name: "FaTrophy", label: "Marketing Campaigns", icon: FaTrophy },
  { name: "FaStar", label: "Brand Awareness", icon: FaStar },
  { name: "FaGem", label: "Premium Branding", icon: FaGem },
  { name: "FaHeart", label: "Customer Engagement", icon: FaHeart },
  { name: "FaLightbulb", label: "Marketing Strategy", icon: FaLightbulb },
  { name: "FaMagic", label: "Creative Marketing", icon: FaMagic },
  { name: "FaPaintBrush", label: "Creative Advertising", icon: FaPaintBrush },
  { name: "FaPalette", label: "Branding", icon: FaPalette },
  { name: "FaPenNib", label: "Copywriting", icon: FaPenNib },
  { name: "FaPen", label: "Content Writing", icon: FaPen },
  { name: "FaNewspaper", label: "Content Marketing", icon: FaNewspaper },
  { name: "FaFileAlt", label: "Marketing Content", icon: FaFileAlt },
  { name: "FaVideo", label: "Video Marketing", icon: FaVideo },
  { name: "FaCamera", label: "Marketing Photography", icon: FaCamera },
  { name: "FaMicrophone", label: "Podcast Marketing", icon: FaMicrophone },
  { name: "FaSearch", label: "Market Research", icon: FaSearch },
  { name: "FaBriefcase", label: "Marketing Business", icon: FaBriefcase },
  { name: "FaHandshake", label: "Partnership Marketing", icon: FaHandshake },
  { name: "FaUserTie", label: "Marketing Consultant", icon: FaUserTie },
  { name: "FaHeadset", label: "Customer Support", icon: FaHeadset },
  { name: "FaPhone", label: "Sales Calls", icon: FaPhone },
  { name: "FaShoppingCart", label: "E-Commerce Marketing", icon: FaShoppingCart },
  { name: "FaShoppingBag", label: "Online Store Marketing", icon: FaShoppingBag },
  { name: "FaStore", label: "Store Marketing", icon: FaStore },
  { name: "FaStoreAlt", label: "Business Marketing", icon: FaStoreAlt },
  { name: "FaCreditCard", label: "Conversion", icon: FaCreditCard },
  { name: "FaMoneyBillWave", label: "Sales Marketing", icon: FaMoneyBillWave },
  { name: "FaCashRegister", label: "Checkout Optimization", icon: FaCashRegister },
  { name: "FaBox", label: "Product Marketing", icon: FaBox },
  { name: "FaCartPlus", label: "Product Promotion", icon: FaCartPlus },
  { name: "FaCloud", label: "Digital Services", icon: FaCloud },
  { name: "FaGlobe", label: "Online Presence", icon: FaGlobe },
  { name: "FaWifi", label: "Digital Connectivity", icon: FaWifi },
  { name: "FaDesktop", label: "Digital Advertising", icon: FaDesktop },
  { name: "FaMobileAlt", label: "Mobile Marketing", icon: FaMobileAlt },
  { name: "FaNetworkWired", label: "Marketing Network", icon: FaNetworkWired },
  { name: "FaGithub", label: "Developer Marketing", icon: FaGithub },
  { name: "FaCode", label: "Marketing Technology", icon: FaCode },
  { name: "FaLaptopCode", label: "Marketing Website", icon: FaLaptopCode },
  { name: "FaProjectDiagram", label: "Marketing Planning", icon: FaProjectDiagram },
  { name: "FaSitemap", label: "Marketing Structure", icon: FaSitemap },
  { name: "FaTasks", label: "Campaign Management", icon: FaTasks },
  { name: "FaClipboardCheck", label: "Campaign Review", icon: FaClipboardCheck },
  { name: "FaCalendarCheck", label: "Campaign Planning", icon: FaCalendarCheck },
  { name: "FaClock", label: "Campaign Timing", icon: FaClock },
  { name: "FaCheckCircle", label: "Campaign Success", icon: FaCheckCircle },
  { name: "FaAward", label: "Marketing Quality", icon: FaAward },
  { name: "FaShieldAlt", label: "Brand Protection", icon: FaShieldAlt },
  { name: "FaLock", label: "Marketing Security", icon: FaLock },
  { name: "FaKey", label: "Account Security", icon: FaKey },
  { name: "FaCloudUploadAlt", label: "Digital Campaign", icon: FaCloudUploadAlt },
  { name: "FaImage", label: "Visual Marketing", icon: FaImage },
  { name: "FaImages", label: "Social Media Content", icon: FaImages },
  { name: "FaCrop", label: "Creative Editing", icon: FaCrop },
  { name: "FaBrush", label: "Creative Content", icon: FaBrush },
  { name: "FaDraftingCompass", label: "Marketing Design", icon: FaDraftingCompass },
  { name: "FaPencilRuler", label: "Campaign Design", icon: FaPencilRuler },
  { name: "FaVectorSquare", label: "Vector Design", icon: FaVectorSquare },
  { name: "FaObjectGroup", label: "Ad Layout", icon: FaObjectGroup },
  { name: "FaLayerGroup", label: "Brand Design", icon: FaLayerGroup },
  { name: "FaCogs", label: "Marketing Automation", icon: FaCogs },
  { name: "FaTools", label: "Marketing Tools", icon: FaTools },
  { name: "FaDatabase", label: "Customer Data", icon: FaDatabase },
  { name: "FaServer", label: "Marketing Systems", icon: FaServer },
  { name: "FaMicrochip", label: "Marketing Technology", icon: FaMicrochip },
  { name: "FaQuestionCircle", label: "Marketing Consultation", icon: FaQuestionCircle },
  { name: "FaBuilding", label: "Business Branding", icon: FaBuilding },
  { name: "FaTrophy", label: "Campaign Results", icon: FaTrophy },
  { name: "FaGem", label: "Premium Marketing", icon: FaGem },
  { name: "FaPhone", label: "Lead Contact", icon: FaPhone },
  { name: "FaEnvelope", label: "Lead Generation Email", icon: FaEnvelope },
];

const iconMap = iconOptions.reduce((acc, item) => {
  acc[item.name] = item.icon;
  return acc;
}, {});

export default function Services() {
  const {
    services = [],
    loading,
    saving,
    error,
    fetchServices,
    createService,
    deleteService: removeService,
  } = useServices();

  const [showForm, setShowForm] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const [search, setSearch] = useState("");
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    icon: "",
  });

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setFormError("");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      icon: "",
    });

    setShowIconPicker(false);
    setIconSearch("");
    setFormError("");
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormError("من فضلك اكتب اسم الخدمة");
      return;
    }

    if (!formData.description.trim()) {
      setFormError("من فضلك اكتب وصف الخدمة");
      return;
    }

    if (!formData.category) {
      setFormError("من فضلك اختر نوع الخدمة");
      return;
    }

    if (!formData.icon) {
      setFormError("من فضلك اختر أيقونة الخدمة");
      return;
    }

    try {
      await createService({
        title: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        icon: formData.icon,
        sort_order: 0,
      });

      closeForm();
    } catch (error) {
      setFormError(
        error?.message || "حدث خطأ أثناء إضافة الخدمة"
      );
    }
  };

  const deleteService = async (id) => {
    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذه الخدمة؟"
    );

    if (!confirmed) {
      return;
    }

    try {
      await removeService(id);
    } catch (error) {
      return;
    }
  };

  const selectIcon = (iconName) => {
    setFormData((prev) => ({
      ...prev,
      icon: iconName,
    }));

    setShowIconPicker(false);
    setIconSearch("");
    setFormError("");
  };

  const filteredIcons = iconOptions.filter((item) => {
    const value = iconSearch.toLowerCase().trim();

    if (!value) {
      return true;
    }

    return (
      item.name.toLowerCase().includes(value) ||
      item.label.toLowerCase().includes(value)
    );
  });

  const filteredServices = services.filter((service) => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return true;
    }

    const title = service.title || "";
    const category = service.category || "";
    const description = service.description || "";

    return (
      title.toLowerCase().includes(value) ||
      category.toLowerCase().includes(value) ||
      description.toLowerCase().includes(value)
    );
  });

  const categoriesCount = new Set(
    services
      .map((service) => service.category)
      .filter(Boolean)
  ).size;

  return (
    <div
      dir="rtl"
      className="min-h-screen space-y-10 bg-black p-4 text-white sm:p-6 lg:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold text-[#00c0a9]">
            WORK-UP SERVICES
          </p>

          <h1 className="text-3xl font-black text-white sm:text-4xl">
            الخدمات
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            أضف وأدر جميع الخدمات التي يقدمها Work-Up.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setFormError("");
          }}
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-[#00c0a9]/30
            bg-[#00c0a9]
            px-6
            py-4
            font-bold
            text-black
            shadow-[0_0_30px_rgba(0,192,169,.15)]
            transition-all
            duration-500
            hover:-translate-y-1
            hover:shadow-[0_0_35px_rgba(0,192,169,.3)]
          "
        >
          <FaPlus />
          إضافة خدمة جديدة
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div
          className="
            rounded-[28px]
            border
            border-white/10
            bg-zinc-900
            p-6
            transition-all
            duration-500
            hover:-translate-y-2
            hover:bg-zinc-800
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                إجمالي الخدمات
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                {services.length}
              </h2>
            </div>

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border-2
                border-[#00c0a9]/40
                bg-black
                text-xl
                text-[#00c0a9]
              "
            >
              <FaBriefcase />
            </div>
          </div>
        </div>

        <div
          className="
            rounded-[28px]
            border
            border-white/10
            bg-zinc-900
            p-6
            transition-all
            duration-500
            hover:-translate-y-2
            hover:bg-zinc-800
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                أنواع الخدمات
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                {categoriesCount}
              </h2>
            </div>

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border-2
                border-[#532aaa]/50
                bg-black
                text-xl
                text-[#9b83df]
              "
            >
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div
          className="
            relative
            overflow-visible
            rounded-[35px]
            border
            border-white/10
            bg-zinc-900
            p-6
            shadow-[0_0_50px_rgba(0,0,0,.25)]
            sm:p-8
            lg:p-10
          "
        >
          <div
            className="
              absolute
              right-10
              top-0
              hidden
              h-full
              w-[2px]
              bg-gradient-to-b
              from-green-500
              via-green-400/50
              to-transparent
              lg:block
            "
          />

          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm font-bold text-[#00c0a9]">
                NEW SERVICE
              </p>

              <h2 className="text-2xl font-black text-white sm:text-3xl">
                إضافة خدمة جديدة
              </h2>

              <p className="mt-2 text-sm leading-7 text-zinc-500">
                أدخل بيانات الخدمة الجديدة
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-black
                text-zinc-400
                transition-all
                duration-500
                hover:rotate-90
                hover:border-red-500/40
                hover:bg-red-500/10
                hover:text-red-400
              "
            >
              <FaTimes />
            </button>
          </div>

          {formError && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-400">
              {formError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div>
              <label className="mb-3 block text-sm font-bold text-zinc-300">
                اسم الخدمة
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="مثال: تصميم وتطوير المواقع"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  px-5
                  py-4
                  text-white
                  outline-none
                  placeholder:text-zinc-700
                  transition-all
                  duration-300
                  focus:border-[#00c0a9]
                  focus:ring-1
                  focus:ring-[#00c0a9]/30
                "
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-zinc-300">
                نوع الخدمة
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  px-5
                  py-4
                  text-white
                  outline-none
                  transition-all
                  duration-300
                  focus:border-[#00c0a9]
                  focus:ring-1
                  focus:ring-[#00c0a9]/30
                "
              >
                <option value="" className="bg-zinc-900">
                  اختر نوع الخدمة
                </option>

                <option
                  value="Web Development"
                  className="bg-zinc-900"
                >
                  Web Development
                </option>

                <option
                  value="UI / UX Design"
                  className="bg-zinc-900"
                >
                  UI / UX Design
                </option>

                <option
                  value="Branding"
                  className="bg-zinc-900"
                >
                  Branding
                </option>

                <option
                  value="Marketing"
                  className="bg-zinc-900"
                >
                  Marketing
                </option>

                <option
                  value="E-Commerce"
                  className="bg-zinc-900"
                >
                  E-Commerce
                </option>

                <option
                  value="SEO"
                  className="bg-zinc-900"
                >
                  SEO
                </option>

                <option
                  value="Content"
                  className="bg-zinc-900"
                >
                  Content
                </option>

                <option
                  value="Consulting"
                  className="bg-zinc-900"
                >
                  Consulting
                </option>
              </select>
            </div>

            <div className="relative">
              <label className="mb-3 block text-sm font-bold text-zinc-300">
                أيقونة الخدمة
              </label>

              <button
                type="button"
                onClick={() =>
                  setShowIconPicker((prev) => !prev)
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  px-5
                  py-4
                  text-white
                  transition-all
                  duration-300
                  hover:border-[#00c0a9]/50
                "
              >
                <span className="flex items-center gap-4">
                  {formData.icon && iconMap[formData.icon] ? (
                    React.createElement(iconMap[formData.icon], {
                      className: "text-2xl text-[#00c0a9]",
                    })
                  ) : (
                    <FaBriefcase className="text-2xl text-zinc-600" />
                  )}

                  <span
                    className={
                      formData.icon
                        ? "text-white"
                        : "text-zinc-600"
                    }
                  >
                    {formData.icon
                      ? iconOptions.find(
                          (item) =>
                            item.name === formData.icon
                        )?.label
                      : "اختر أيقونة الخدمة"}
                  </span>
                </span>

                <span className="text-xl text-zinc-600">
                  {showIconPicker ? "−" : "+"}
                </span>
              </button>

              {showIconPicker && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    z-[100]
                    mt-3
                    w-full
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-zinc-950
                    p-4
                    shadow-[0_25px_80px_rgba(0,0,0,.7)]
                  "
                >
                  <div className="relative mb-4">
                    <FaSearch
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-zinc-600
                      "
                    />

                    <input
                      type="text"
                      value={iconSearch}
                      onChange={(e) =>
                        setIconSearch(e.target.value)
                      }
                      placeholder="ابحث عن الأيقونة..."
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-black
                        py-3
                        pl-4
                        pr-11
                        text-white
                        outline-none
                        placeholder:text-zinc-700
                        focus:border-[#00c0a9]
                      "
                    />
                  </div>

                  <div
                    className="
                      grid
                      max-h-80
                      grid-cols-4
                      gap-2
                      overflow-y-auto
                      sm:grid-cols-5
                      md:grid-cols-6
                      lg:grid-cols-7
                    "
                  >
                    {filteredIcons.map((item, index) => {
                      const Icon = item.icon;
                      const selected =
                        formData.icon === item.name;

                      return (
                        <button
                          key={`${item.name}-${index}`}
                          type="button"
                          onClick={() =>
                            selectIcon(item.name)
                          }
                          title={item.label}
                          className={`
                            flex
                            h-16
                            flex-col
                            items-center
                            justify-center
                            gap-1
                            rounded-2xl
                            border
                            transition-all
                            duration-300
                            ${
                              selected
                                ? "border-[#00c0a9] bg-[#00c0a9]/10 text-[#00c0a9] shadow-[0_0_20px_rgba(0,192,169,.12)]"
                                : "border-white/5 bg-zinc-900 text-zinc-500 hover:border-[#00c0a9]/40 hover:bg-zinc-800 hover:text-[#00c0a9]"
                            }
                          `}
                        >
                          <Icon className="text-xl" />

                          <span className="max-w-full truncate px-1 text-[9px]">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {filteredIcons.length === 0 && (
                    <div className="py-8 text-center text-sm text-zinc-600">
                      لا توجد أيقونات بهذا الاسم
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-bold text-zinc-300">
                وصف الخدمة
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="اكتب وصف مختصر للخدمة..."
                className="
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  px-5
                  py-4
                  text-white
                  outline-none
                  placeholder:text-zinc-700
                  transition-all
                  duration-300
                  focus:border-[#00c0a9]
                  focus:ring-1
                  focus:ring-[#00c0a9]/30
                "
              />
            </div>

            <div className="flex items-end justify-end md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-[#00c0a9]
                  px-8
                  py-4
                  font-black
                  text-black
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:rotate-1
                  hover:shadow-[0_0_35px_rgba(0,192,169,.3)]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {saving ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    جاري الإضافة...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    إضافة الخدمة
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div
        className="
          relative
          overflow-hidden
          rounded-[35px]
          border
          border-white/10
          bg-zinc-900
        "
      >
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold text-[#00c0a9]">
                OUR SERVICES
              </p>

              <h2 className="text-2xl font-black text-white sm:text-3xl">
                الخدمات المضافة
              </h2>

              <p className="mt-2 text-sm leading-7 text-zinc-500">
                جميع الخدمات التي تقدمها Work-Up
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <FaSearch
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-600
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن خدمة..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  py-3.5
                  pl-4
                  pr-11
                  text-white
                  outline-none
                  placeholder:text-zinc-700
                  transition
                  focus:border-[#00c0a9]
                "
              />
            </div>
          </div>

          <div className="relative mt-10">
            <div
              className="
                absolute
                right-10
                top-0
                hidden
                h-full
                w-[2px]
                bg-gradient-to-b
                from-green-500
                via-green-400/50
                to-transparent
                lg:block
              "
            />

            {loading ? (
              <div className="py-20 text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#00c0a9]/20 border-t-[#00c0a9]" />

                <p className="mt-5 text-sm font-bold text-zinc-500">
                  جاري تحميل الخدمات...
                </p>
              </div>
            ) : filteredServices.length > 0 ? (
              <div className="space-y-6">
                {filteredServices.map((service) => {
                  const ServiceIcon =
                    iconMap[service.icon] || FaBriefcase;

                  return (
                    <div
                      key={service.id}
                      className="
                        group
                        relative
                        flex
                        flex-col
                        gap-6
                        rounded-[28px]
                        border
                        border-white/10
                        bg-black
                        p-6
                        transition-all
                        duration-500
                        hover:-translate-y-2
                        hover:bg-zinc-800
                        sm:p-8
                        lg:flex-row
                        lg:items-center
                        lg:gap-8
                        lg:rounded-[35px]
                        lg:p-10
                      "
                    >
                      <div
                        className="
                          flex
                          h-20
                          w-20
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border-4
                          border-[#00c0a9]
                          bg-black
                          text-3xl
                          text-[#00c0a9]
                          shadow-[0_0_30px_rgba(34,197,94,.25)]
                          transition-all
                          duration-500
                          group-hover:scale-105
                          sm:h-24
                          sm:w-24
                          sm:text-4xl
                        "
                      >
                        <ServiceIcon />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-3">
                          <span
                            className="
                              inline-flex
                              rounded-full
                              border
                              border-[#00c0a9]/20
                              bg-[#00c0a9]/10
                              px-3
                              py-1.5
                              text-xs
                              font-bold
                              text-[#00c0a9]
                            "
                          >
                            {service.category || "Service"}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-[#00c0a9] sm:text-3xl">
                          {service.title}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                          {service.description}
                        </p>
                      </div>

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                          lg:flex-col
                        "
                      >
                        <button
                          type="button"
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-blue-500/20
                            bg-blue-500/10
                            text-blue-400
                            transition-all
                            duration-500
                            hover:bg-blue-500
                            hover:text-white
                          "
                        >
                          <FaEye />
                        </button>

                        <button
                          type="button"
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#532aaa]/30
                            bg-[#532aaa]/10
                            text-[#9b83df]
                            transition-all
                            duration-500
                            hover:bg-[#532aaa]
                            hover:text-white
                          "
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          disabled={saving}
                          onClick={() =>
                            deleteService(service.id)
                          }
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-red-500/20
                            bg-red-500/10
                            text-red-400
                            transition-all
                            duration-500
                            hover:bg-red-500
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          <FaTrash />
                        </button>
                      </div>

                      <div
                        className="
                          hidden
                          h-16
                          w-16
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#00c0a9]
                          text-3xl
                          font-bold
                          text-black
                          transition-all
                          duration-500
                          group-hover:rotate-45
                          lg:flex
                        "
                      >
                        →
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center">
                <FaBriefcase className="mx-auto text-5xl text-zinc-700" />

                <p className="mt-5 text-zinc-500">
                  {search
                    ? "لا توجد خدمات بهذا الاسم"
                    : "لا توجد خدمات مضافة حتى الآن"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}