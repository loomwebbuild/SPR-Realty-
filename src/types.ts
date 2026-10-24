export interface SocialLink {
  name: string;
  url: string;
  ariaLabel: string;
}

export const BUSINESS_INFO = {
  name: 'SPR Realty',
  type: 'Real Estate Company, Chennai',
  tagline: 'Building Trust, Creating Future',
  location: 'Ekkattuthangal, Chennai 600032',
  phone: '+91 97907 01449',
  phoneTel: 'tel:+919790701449',
  whatsappUrl: 'https://wa.me/919790701449',
  socials: [
    {
      name: 'Facebook',
      url: 'https://facebook.com/sprrealty',
      ariaLabel: 'SPR Realty on Facebook',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/spr_realty',
      ariaLabel: 'SPR Realty on Instagram',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/sprrealty',
      ariaLabel: 'SPR Realty on LinkedIn',
    },
    {
      name: 'X',
      url: 'https://x.com/spr_realty',
      ariaLabel: 'SPR Realty on X',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@spr_realty',
      ariaLabel: 'SPR Realty on YouTube',
    },
  ],
};
