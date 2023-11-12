const tags = [
	'Mensa',
	'Essen',
	'Ponte',
	'Pontstraße',
	'Ponttor',
	'VPN',
	'FH',
	'RWTH',
	'ITC',
	'Email',
	'Freizeit',
	'IHK',
	'matse-dienste',
	'Skript',
	'Video',
	'Lernen',
	'Software',
	'Lizenz',

	// module
	'Mathe',
	'Programmierung'
] as const;

type Tag = (typeof tags)[number];

export const links: {
	label: string;
	items: {
		label: string;
		items: {
			label: string;
			url: string;
			description?: string;
			tags: Tag[];
		}[];
	}[];
}[] = [
	{
		label: 'Allgemein',
		items: [
			{
				label: 'Mensen',
				items: [
					{
						label: 'Academica',
						description: 'Mensa in der Nähe vom Ponttor',
						url: 'https://www.studierendenwerk-aachen.de/de/Gastronomie/mensa-academica-wochenplan.html',
						tags: ['Essen', 'Mensa', 'Ponttor']
					},
					{
						label: 'Ahornstraße',
						description: 'Mensa um die Ecke vom ITC',
						url: 'https://www.studierendenwerk-aachen.de/de/Gastronomie/mensa-ahornstrasse-wochenplan.html',
						tags: ['Essen', 'Mensa', 'ITC']
					}
				]
			},
			{
				label: 'FH',
				items: [
					{
						label: 'Exchange  (Mail)',
						url: 'https://mail.fh-aachen.de/',
						tags: ['FH', 'Email']
					},
					{
						label: 'ILIAS',
						description: 'Material zu den Vorlesungen',
						url: 'https://ili.fh-aachen.de/',
						tags: ['FH']
					},
					{
						label: 'QIS',
						description: 'Anmeldung und Einricht von Klausuren',
						url: 'https://qis.fh-aachen.de/',
						tags: ['FH']
					},
					{
						label: 'Campus Office',
						description:
							'Planung und Verwaltung von verschiedenen Vorlesungs- und Veranstaltungsdaten',
						url: 'https://www.campusoffice.fh-aachen.de/',
						tags: ['FH']
					},
					{
						label: 'HISinOne STU',
						description: 'Zentrales Portal der FH-Aachen',
						url: 'https://h1.fh-aachen.de/',
						tags: ['FH']
					},
					{
						label: 'VPN',
						description: 'VPN-Dienst, um bspw. auf das QIS von Außerhalb der Uni zuzugreifen',
						url: 'https://vpn.fh-aachen.de',
						tags: ['FH', 'VPN']
					},
					{
						label: 'Studiumsvorbereitung',
						description: 'Vorbereitende Aufgaben zum Studium',
						url: 'https://www.fh-aachen.de/studium/informieren/studienvorbereitung',
						tags: ['FH']
					}
				]
			},
			{
				label: 'RWTH',
				items: [
					{
						label: 'Exchange (Mail)',
						url: 'https://mail.rwth-aachen.de/',
						tags: ['RWTH', 'Email']
					},
					{
						label: 'Hochschulsport',
						description: 'Anmeldung zu günstigem Sportangeboten',
						url: 'https://hochschulsport.rwth-aachen.de/cms/~icgi/HSZ/',
						tags: ['RWTH', 'Freizeit']
					},
					{
						label: 'Identity Management Selfservice (Idm)',
						description: 'Passwörter ändern und verwalten',
						url: 'https://idm.rwth-aachen.de/selfservice/PersonalData',
						tags: ['RWTH']
					}
				]
			},
			{
				label: 'IHK',
				items: [
					{
						label: 'Anmeldung',
						description: 'Anmeldung beim Azubi-Portal der IHK',
						url: 'https://berufsausbildung-aachen-ihk.de/tibrosBB/BB_auszubildende.jsp',
						tags: ['IHK']
					},
					{
						label: 'Ausbildungsnachweise',
						description: 'Einreichen der Ausbildungsnachweise',
						url: 'https://berufsausbildung-aachen-ihk.de/tibrosBB/azubiHeft.jsp',
						tags: ['IHK']
					}
				]
			},
			{
				label: 'MATSE',
				items: [
					{
						label: 'Wiki',
						url: 'https://www.matse.itc.rwth-aachen.de/dienste/public/index.php?m: wiki',
						tags: ['matse-dienste']
					},
					{
						label: 'Dienste',
						url: 'https://www.matse.itc.rwth-aachen.de/dienste/protected/index.php',
						tags: ['matse-dienste']
					},
					{
						label: 'Stundenplan',
						url: 'https://www.matse.itc.rwth-aachen.de/stundenplan/web/index.html',
						tags: ['matse-dienste']
					}
				]
			},
			{
				label: 'Software',
				items: [
					{
						label: 'MS Office 365',
						description: 'Excel, Word, PowerPoint, etc.',
						url: 'https://www.fh-aachen.de/fh-aachen/hochschulstruktur/zentrale-betriebseinheiten/dvz/anleitungen/office-365',
						tags: ['Software']
					}
				]
			},
			{
				label: 'Sonstiges',
				items: [
					{
						label: 'Paddel',
						description: 'Spicker, Lösungen und andere Materialien rund um MATSE',
						url: 'https://paddel.xyz',
						tags: []
					}
				]
			}
		]
	},
	{
		label: 'Mathematik',
		items: [
			{
				label: 'Skripte',
				items: [
					{
						label: '1. Semester',
						url: 'https://www.ili.fh-aachen.de/goto_elearning_crs_988059.html',
						tags: ['Mathe', 'Skript']
					}
				]
			},
			{
				label: 'Lernen',
				items: [
					{
						label: 'Mathe by Daniel Jung',
						description:
							'YouTube-Tutorials zu allen Mathe-Themen. Sehr gut versändlich und auf den Punkt gebracht',
						url: 'https://www.youtube.com/@MathebyDanielJung',
						tags: ['Mathe', 'Video', 'Lernen']
					},
					{
						label: 'MathemaTrick',
						description: 'YouTube-Tutorials zu Mathe',
						url: 'https://www.youtube.com/@MathemaTrick',
						tags: ['Mathe', 'Video', 'Lernen']
					},
					{
						label: 'Online Mathe Brückenkurs (OBM+)',
						description: 'Mathekenntnisse nach der Schule für die Uni auffrischen',
						url: 'https://ombplus.de/',
						tags: ['Mathe', 'Lernen']
					},
					{
						label: 'Hohe Mathematik (NRW)',
						description:
							'Einführung und Übungen in die Höhere Mathematik vom Land NRW bereitgestellt',
						url: 'https://hm4mint.nrw/',
						tags: ['Mathe', 'Lernen']
					}
				]
			},
			{
				label: 'Sonstiges',
				items: [
					{
						label: 'Wolfram|Alpha',
						description: 'Mathematische Formeln und Ausdrücke auswerten',
						url: 'https://www.wolframalpha.com/',
						tags: ['Mathe']
					},
					{
						label: 'Symbolab',
						description: 'Alternative zu Wolfram|Alpha mit kostenlosen Lösungsweg',
						url: 'https://de.symbolab.com/',
						tags: ['Mathe']
					}
				]
			}
		]
	},
	{
		label: 'Programmieren',
		items: [
			{
				label: 'Skripte',
				items: [
					{
						label: '1. Semester',
						url: 'https://www.ili.fh-aachen.de/goto_elearning_crs_1136668.html#script',
						tags: ['Programmierung', 'Skript']
					}
				]
			},
			{
				label: 'Lernen',
				items: [
					{
						label: 'The Morpheus Tutorials',
						description:
							'YouTube-Tutorials zu allen möglichen Progammiersprachen, Konzepten und auch teils Uni-Mathe',
						url: 'https://www.youtube.com/@TheMorpheusTutorials',
						tags: ['Programmierung', 'Video', 'Lernen']
					},
					{
						label: 'Geeks for Geeks Java',
						description: 'Java-Tutorials in gut verständlichem Englisch',
						url: 'https://www.geeksforgeeks.org/java/?ref: shm_outind',
						tags: ['Programmierung', 'Lernen']
					},
					{
						label: 'CodingBat Java',
						description: 'Kleinere Übungen, um mit dem Umgang mit Java vertrauter zu werden',
						url: 'https://codingbat.com/java',
						tags: ['Programmierung', 'Lernen']
					},
					{
						label: 'Codecadamy Java',
						description: 'Geführter Java-Kurs',
						url: 'https://www.codecademy.com/learn/learn-java',
						tags: ['Programmierung', 'Lernen']
					},
					{
						label: 'W3school Java',
						description: 'Java-Tutorials und gut zum Nachschlagen',
						url: 'https://www.w3schools.com/java/default.asp',
						tags: ['Programmierung', 'Lernen']
					}
				]
			},
			{
				label: 'Lizenzen',
				items: [
					{
						label: 'Eclipse IDE',
						description: 'Simple, aber limitierte IDE zum Einstieg ins Programmieren',
						url: 'https://www.eclipse.org/downloads/',
						tags: ['Programmierung', 'Software']
					},
					{
						label: 'IntelliJ IDE',
						description: 'Komplexe und Umfangreiche IDE; der de facto Industriestandart',
						url: 'https://www.jetbrains.com/de-de/idea/',
						tags: ['Programmierung', 'Software']
					},
					{
						label: 'VS Code',
						description: 'Sehr flexible und schnelle IDE',
						url: 'https://code.visualstudio.com',
						tags: ['Programmierung', 'Software']
					},
					{
						label: 'GitHub Education Pack',
						description:
							'Viele kostenlose Produkte für Schüler u. Studenten. U.a. alle JetBrains Ultimate Lizenzen, Kurse und Cloud-Anbieter',
						url: 'https://education.github.com/pack',
						tags: ['Programmierung', 'Lizenz']
					},
					{
						label: 'FH-Aachen GitLab',
						description: 'Git-Instance der FH; Code online sichern und zusammenarbeiten',
						url: 'https://git.fh-aachen.de',
						tags: ['Programmierung']
					},
					{
						label: 'Azure Dev Tools',
						description:
							'Azure-Cloud Credits und Zugriff auf viele weitere Produkte von Microsoft (außer Office-Produkte)',
						url: 'https://www.fh-aachen.de/fh-aachen/hochschulstruktur/zentrale-betriebseinheiten/dvz/anleitungen/microsoft-azure-dev-tools-for-teaching',
						tags: ['Programmierung', 'Lizenz']
					}
				]
			}
		]
	}
];

export const generelizedLinks = links.flatMap((group) => {
	return group.items.flatMap((subgroup) => {
		return subgroup.items.map((link) => {
			return {
				group: group.label,
				subgroup: subgroup.label,
				...link,

				searchable: `${subgroup.label} ${link.label} ${link.description ?? ''}`.toLowerCase()
			};
		});
	});
});
