import Camp from '@/components/Camp';
import Features from '@/components/Features';
import GetApp from '@/components/GetApp';
import Guide from '@/components/Guide';
import Hero from '@/components/Hero';
import { NAV_LINKS, FOOTER_LINKS, FOOTER_CONTACT_INFO, SOCIALS } from '@/constants';

export default function Page({ params }: { params: { slug: string } }) {
	const { slug } = params;

	// Check navbar links
	const navPageInfo = NAV_LINKS.find((link) => link.key === slug);
	if (navPageInfo) {
		return (
			<>
				<Hero
					title={navPageInfo.label}
					subtitle={`Explore ${navPageInfo.label} with Anytime`}
					customClass='min-h-[400px]'
				/>
				{slug === 'how_anytime_work' && <Guide />}
				{slug === 'services' && <Features />}
				{slug === 'pricing' && <Camp />}
				{slug === 'contact_us' && <GetApp />}
			</>
		);
	}

	// Check footer links
	const footerPageInfo = FOOTER_LINKS.flatMap((section) => section.links).find((link) => link.key === slug);
	if (footerPageInfo) {
		return (
			<Hero
				title={footerPageInfo.label}
				subtitle={`Learn more about ${footerPageInfo.label}`}
				customClass='min-h-[400px]'
			/>
		);
	}

	// Check contact info
	const contactPageInfo = FOOTER_CONTACT_INFO.links.find((link) => link.key === slug);
	if (contactPageInfo) {
		return (
			<Hero
				title={contactPageInfo.label}
				subtitle={`Contact us: ${contactPageInfo.value}`}
				customClass='min-h-[400px]'
			/>
		);
	}

	// Check social links
	const socialPageInfo = SOCIALS.links.find((link) => link.key === slug);
	if (socialPageInfo) {
		return (
			<Hero
				title={`Our ${socialPageInfo.key} Page`}
				subtitle={`Connect with us on ${socialPageInfo.key}`}
				customClass='min-h-[400px]'
			/>
		);
	}

	return <div>Page not found</div>;
}

export function generateStaticParams() {
	const navParams = NAV_LINKS.map((link) => ({ slug: link.key }));
	const footerParams = FOOTER_LINKS.flatMap((section) => section.links.map((link) => ({ slug: link.key })));
	const contactParams = FOOTER_CONTACT_INFO.links.map((link) => ({ slug: link.key }));
	const socialParams = SOCIALS.links.map((link) => ({ slug: link.key }));

	return [...navParams, ...footerParams, ...contactParams, ...socialParams];
}
