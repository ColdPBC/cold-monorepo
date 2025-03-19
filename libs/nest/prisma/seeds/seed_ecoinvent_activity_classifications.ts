import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const classifications = [
	{
		id: '5985aa1a-764f-4f61-9c21-bcdff1aefb7d',
		name: '0620:Extraction of natural gas',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0620 Description: Extraction of natural gas Explanatory Note Inclusion: This class includes:\n- production of crude gaseous hydrocarbon (natural gas)\n- extraction of condensates\n- draining and separation of liquid hydrocarbon fractions\n- gas desulphurization\n\nThis class also includes:\n- mining of hydrocarbon liquids, obtained through liquefaction or pyrolysis Explanatory Note Exclusion: This class excludes:\n- support activities for oil and gas extraction, see 0910\n- oil and gas exploration, see 0910\n- recovery of liquefied petroleum gases in the refining of petroleum, see 1920\n- manufacture of industrial gases, see 2011\n- operation of pipelines, see 4930',
	},
	{
		id: '0b990b98-9c52-4932-837c-3e9f680f3afc',
		name: '0164:Seed processing for propagation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0164 Description: Seed processing for propagation Explanatory Note Inclusion: This class includes all post-harvest activities aimed at improving the propagation quality of seed through the removal of non-seed materials, undersized, mechanically or insect-damaged and immature seeds as well as removing the seed moisture to a safe level for seed storage. This activity includes the drying, cleaning, grading and treating of seeds until they are marketed. The treatment of genetically modified seeds is included here. Explanatory Note Exclusion: This class excludes:\n- growing of seeds, see groups 011 and 012\n- processing of seeds to obtain oil, see 1040\n- research to develop or modify new forms of seeds, see 7210',
	},
	{
		id: '820a781e-a787-46f3-8ede-6f741c2745d8',
		name: '4912:Freight rail transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4912 Description: Freight rail transport Explanatory Note Inclusion: This class includes:\n- freight transport on mainline rail networks as well as short-line freight railroads Explanatory Note Exclusion: This class excludes:\n- storage and warehousing, see 5210\n- freight terminal activities, see 5221\n- cargo handling, see 5224',
	},
	{
		id: '64bfd509-fdc1-4c5d-8930-c123b69f8238',
		name: '463:Wholesale of food, beverages and tobacco',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 463 Description: Wholesale of food, beverages and tobacco Explanatory Note Inclusion: See class 4630. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e99b6cb6-a848-4921-b5eb-dc290c2f44c7',
		name: '108:Manufacture of prepared animal feeds',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 108 Description: Manufacture of prepared animal feeds Explanatory Note Inclusion: See class 1080. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e6c45c39-45d9-4b37-933a-c485e839f713',
		name: '662:Activities auxiliary to insurance and pension funding',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 662 Description: Activities auxiliary to insurance and pension funding Explanatory Note Inclusion: This group includes acting as agent (i.e. broker) in selling annuities and insurance policies or providing other employee benefits and insurance and pension related services such as claims adjustment and third party administration. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'aa2210a8-9733-4513-9022-1277d5accea0',
		name: '101:Processing and preserving of meat',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 101 Description: Processing and preserving of meat Explanatory Note Inclusion: See class 1010. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2c587f58-6a81-4952-a977-6b6e442f0b65',
		name: '842:Provision of services to the community as a whole',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 842 Description: Provision of services to the community as a whole Explanatory Note Inclusion: This group includes foreign affairs, defence and public order and safety activities. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9567696e-fbbf-4db1-80e4-f3c50b4b5e7f',
		name: 'P:Education',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: P Description: Education Explanatory Note Inclusion: This section includes education at any level or for any profession, oral or written as well as by radio and television or other means of communication. It includes education by the different institutions in the regular school system at its different levels as well as adult education, literacy programmes etc. Also included are military schools and academies, prison schools etc. at their respective levels. The section includes public as well as private education.\n\nFor each level of initial education, the classes include special education for physically or mentally handicapped pupils. \n\nThe breakdown of the categories in this section is based on the level of education offered as defined by the levels of ISCED 1997. The activities of educational institutions providing education at ISCED levels 0 and 1 are classified in group 851, those at ISCED levels 2 and 3 in group 852 and those at ISCED levels 4, 5 and 6 in group 853.\n\nThis section also includes instruction primarily concerned with sport and recreational activities such as bridge or golf and education support activities. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '671bf787-82a1-48b3-bee4-debadf8f6821',
		name: '502:Inland water transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 502 Description: Inland water transport Explanatory Note Inclusion: This group includes the transport of passengers or freight on inland waters, involving vessels that are not suitable for sea transport. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e4a59b28-b033-4c3c-b070-7d277913d845',
		name: '949:Activities of other membership organizations',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 949 Description: Activities of other membership organizations Explanatory Note Inclusion: This group includes the activities of units (except business and employers organizations, professional organizations, trade unions) that promote the interests of their members. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '1fccd383-60db-4a4b-9d7a-b6f126ef5a76',
		name: '1811:Printing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1811 Description: Printing Explanatory Note Inclusion: This class includes:\n- printing of newspapers, magazines and other periodicals, books and brochures, music and music manuscripts, maps, atlases, posters, advertising catalogues, prospectuses and other printed advertising, postage stamps, taxation stamps, documents of title, cheques and other security papers, diaries, calendars, business forms and other commercial printed matter, personal stationery and other printed matter by letterpress, offset, photogravure, flexographic and other printing presses, duplication machines, computer printers, embossers etc., including quick printing\n- printing directly onto textiles, plastic, glass, metal, wood and ceramics (except silk-screen printing on textiles and wearing apparel)\n\nThe material printed is typically copyrighted.\n\nThis class also includes:\n- printing on labels or tags (lithographic, gravure printing, flexographic printing, other) Explanatory Note Exclusion: This class excludes:\n- silk-screen printing on textiles and wearing apparel, see 1313\n- manufacture of paper articles, such as binders, see 1709\n- publishing of printed matter, see group 581\n- photocopying of documents, see 8219',
	},
	{
		id: 'ee6337c0-2c4f-4d5c-aed9-f30ca5f9bfcd',
		name: '302:Manufacture of railway locomotives and rolling stock',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 302 Description: Manufacture of railway locomotives and rolling stock Explanatory Note Inclusion: See class 3020. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '281377bb-8f21-46ef-af54-325ec7decf23',
		name: '4773:Other retail sale of new goods in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4773 Description: Other retail sale of new goods in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of photographic, optical and precision equipment\n- activities of opticians\n- retail sale of watches, clocks and jewellery\n- retail sale of flowers, plants, seeds, fertilizers, pet animals and pet food\n- retail sale of souvenirs, craftwork and religious articles\n- activities of commercial art galleries\n- retail sale of household fuel oil, bottled gas, coal and fuel wood\n- retail sale of cleaning materials\n- retail sale of weapons and ammunition\n- retail sale of stamps and coins\n- retail sale of non-food products n.e.c. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9e9a6abe-b21b-45c2-b9ed-7c03a5e81b83',
		name: '1820:Reproduction of recorded media',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1820 Description: Reproduction of recorded media Explanatory Note Inclusion: This class includes:\n- reproduction from master copies of gramophone records, compact discs and tapes with music or other sound recordings\n- reproduction from master copies of records, compact discs and tapes with motion pictures and other video recordings\n- reproduction from master copies of software and data on discs and tapes Explanatory Note Exclusion: This class excludes:\n- reproduction of printed matter, see 1811\n- publishing of software, see 5820\n- production and distribution of motion pictures, video tapes and movies on DVD or similar media, see 5911, 5912, 5913\n- reproduction of motion picture film for theatrical distribution, see 5912\n- production of master copies for records or audio material, see 5920',
	},
	{
		id: 'ab1aa231-fcc4-4779-805b-e7bf3695a2ee',
		name: '2813:Manufacture of other pumps, compressors, taps and valves',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2813 Description: Manufacture of other pumps, compressors, taps and valves Explanatory Note Inclusion: This class includes:\n- manufacture of air or vacuum pumps, air or other gas compressors\n- manufacture of pumps for liquids whether or not fitted with a measuring device\n- manufacture of pumps designed for fitting to internal combustion engines: oil, water and fuel pumps for motor vehicles etc.\n\nThis class also includes:\n- manufacture of industrial taps and valves, including regulating valves and intake taps\n- manufacture of sanitary taps and valves\n- manufacture of heating taps and valves\n- manufacture of hand pumps Explanatory Note Exclusion: This class excludes:\n- manufacture of valves of unhardened vulcanized rubber, glass or of ceramic materials, see 2219, 2310 or 2393\n- manufacture of hydraulic transmission equipment, see 2812\n- manufacture of inlet and exhaust valves of internal combustion engines, see 2811',
	},
	{
		id: '12baaeef-24a7-422f-bc25-7bbd7cfde7fc',
		name: '611:Wired telecommunications activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 611 Description: Wired telecommunications activities Explanatory Note Inclusion: See class 6110. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'fd4e7a63-4560-4284-8801-0e740a1e2c12',
		name: '091:Support activities for petroleum and natural gas extraction',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 091 Description: Support activities for petroleum and natural gas extraction Explanatory Note Inclusion: See class 0910. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8a45a80b-336f-4a04-95fb-1a1be360d2d3',
		name: '2021:Manufacture of pesticides and other agrochemical products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2021 Description: Manufacture of pesticides and other agrochemical products Explanatory Note Inclusion: This class includes:\n- manufacture of insecticides, rodenticides, fungicides, herbicides\n- manufacture of anti-sprouting products, plant growth regulators\n- manufacture of disinfectants (for agricultural and other use)\n- manufacture of other agrochemical products n.e.c. Explanatory Note Exclusion: This class excludes:\n- manufacture of fertilizers and nitrogen compounds, see 2012',
	},
	{
		id: '210d941d-49a0-4fa3-a560-36e001b8d18f',
		name: '26:Manufacture of computer, electronic and optical products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 26 Description: Manufacture of computer, electronic and optical products Explanatory Note Inclusion: This division includes the manufacture of computers, computer peripherals, communications equipment, and similar electronic products, as well as the manufacture of components for such products. Production processes of this division are characterized by the design and use of integrated circuits and the application of highly specialized miniaturization technologies.\nThe division also contains the manufacture of consumer electronics, measuring, testing, navigating, and control equipment, irradiation, electromedical and electrotherapeutic equipment, optical instruments and equipment, and the manufacture of magnetic and optical media. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f55de2cc-6a5e-4bf8-8dce-b0096f972c21',
		name: '64:Financial service activities, except insurance and pension funding',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 64 Description: Financial service activities, except insurance and pension funding Explanatory Note Inclusion: This division includes the activities of obtaining and redistributing funds other than for the purpose of insurance or pension funding or compulsory social security.\nNote: National institutional arrangements are likely to play a significant role in determining the classification within this division. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ecb6bb34-5733-4711-96ff-b62383be4758',
		name: '383:Materials recovery',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 383 Description: Materials recovery Explanatory Note Inclusion: See class 3830. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '60181a9b-5e94-406c-a5d2-6deff20591c1',
		name: '741:Specialized design activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 741 Description: Specialized design activities Explanatory Note Inclusion: See class 7410. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'db458b53-aac2-4dd8-aa99-8f5e86ea9e14',
		name: '4641:Wholesale of textiles, clothing and footwear',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4641 Description: Wholesale of textiles, clothing and footwear Explanatory Note Inclusion: This class includes:\n- wholesale of yarn\n- wholesale of fabrics\n- wholesale of household linen etc.\n- wholesale of haberdashery: needles, sewing thread etc.\n- wholesale of clothing, including sports clothes\n- wholesale of clothing accessories such as gloves, ties and braces\n- wholesale of footwear\n- wholesale of fur articles\n- wholesale of umbrellas Explanatory Note Exclusion: This class excludes:\n- wholesale of jewellery and leather goods, see 4649\n- wholesale of textile fibres, see 4669',
	},
	{
		id: '2c7885cc-4852-4e51-b7ed-8b5d1535b106',
		name: '982:Undifferentiated service-producing activities of private households for own',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 982 Description: Undifferentiated service-producing activities of private households for own use Explanatory Note Inclusion: See class 9820. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f5c450a9-f96f-4d5c-bc47-9917dc13fb43',
		name: '0142:Raising of horses and other equines',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0142 Description: Raising of horses and other equines Explanatory Note Inclusion: This class includes:\n- raising and breeding of horses (including racing horses), asses, mules or hinnies Explanatory Note Exclusion: This class excludes:\n- operation of racing and riding stables, see 9319',
	},
	{
		id: '98eb2fd3-c368-4689-a1d6-4edf37cb3bae',
		name: '783:Other human resources provision',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 783 Description: Other human resources provision Explanatory Note Inclusion: See class 7830. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '15a0319a-9173-4e80-8473-3ffccf13e91f',
		name: '6621:Risk and damage evaluation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6621 Description: Risk and damage evaluation Explanatory Note Inclusion: This class includes the provision of administration services of insurance, such as assessing and settling insurance claims.\n\nThis class includes:\n- assessing insurance claims\n* claims adjusting\n* risk assessing\n* risk and damage evaluation\n* average and loss adjusting\n- settling insurance claims Explanatory Note Exclusion: This class excludes:\n- appraisal of real estate, see 6820\n- appraisal for other purposes, see 7490\n- investigation activities, see 8030',
	},
	{
		id: '6885b734-ad0c-4618-8fd5-44ae94604e11',
		name: '0126:Growing of oleaginous fruits',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0126 Description: Growing of oleaginous fruits Explanatory Note Inclusion: This class includes:\n- growing of oleaginous fruits:\n* coconuts\n* olives\n* oil palms\n* other oleaginous fruits Explanatory Note Exclusion: This class excludes:\n- growing of soya beans, groundnuts and other oil seeds, see 0111',
	},
	{
		id: '7733b6d6-9b57-4663-a424-4437e1eaceb8',
		name: '30:Manufacture of other transport equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 30 Description: Manufacture of other transport equipment Explanatory Note Inclusion: This division includes the manufacture of transportation equipment such as ship building and boat manufacturing, the manufacture of railroad rolling stock and locomotives, air and spacecraft and the manufacture of parts thereof. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '42f319b5-ebdd-4d65-8718-a4ea63de6ede',
		name: '0520:Mining of lignite',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0520 Description: Mining of lignite Explanatory Note Inclusion: This class includes:\n- mining of lignite (brown coal): underground or surface mining, including mining through liquefaction methods\n- washing, dehydrating, pulverizing, compressing of lignite to improve quality or facilitate transport or storage Explanatory Note Exclusion: This class excludes:\n- hard coal mining, see 0510\n- peat digging, see 0892\n- test drilling for coal mining, see 0990\n- support activities for lignite mining, see 0990\n- manufacture of lignite fuel briquettes, see 1920\n- work performed to develop or prepare properties for coal mining, see 4312',
	},
	{
		id: 'a92fc2d2-2f1e-4818-b4bc-7b5c43c27e3b',
		name: 'D:Electricity, gas, steam and air conditioning supply',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: D Description: Electricity, gas, steam and air conditioning supply Explanatory Note Inclusion: This section includes the activity of providing electric power, natural gas, steam, hot water and the like through a permanent infrastructure (network) of lines, mains and pipes. The dimension of the network is not decisive; also included are the distribution of electricity, gas, steam, hot water and the like in industrial parks or residential buildings.\nThis section therefore includes the operation of electric and gas utilities, which generate, control and distribute electric power or gas. Also included is the provision of steam and air-conditioning supply. \n\nThis section excludes the operation of water and sewerage utilities, see 36, 37. This section also excludes the (typically long-distance) transport of gas through pipelines. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4c3b7870-d05d-41cf-9a2f-d901c183b0d8',
		name: '3510:Electric power generation, transmission and distribution',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3510 Description: Electric power generation, transmission and distribution Explanatory Note Inclusion: This class includes the generation of bulk electric power, transmission from generating facilities to distribution centers and distribution to end users. \n\nThis class includes:\n- operation of generation facilities that produce electric energy, including thermal, nuclear, hydroelectric, gas turbine, diesel and renewable \n- operation of transmission systems that convey the electricity from the generation facility to the distribution system\n- operation of distribution systems (i.e. consisting of lines, poles, meters, and wiring) that convey electric power received from the generation facility or the transmission system to the final consumer\n- sale of electricity to the user\n- activities of electric power brokers or agents that arrange the sale of electricity via power distribution systems operated by others\n- operation of electricity and transmission capacity exchanges for electric power Explanatory Note Exclusion: This class excludes:\n- production of electricity through incineration of waste, see 3821',
	},
	{
		id: 'c35782c6-5dea-4c8d-a3fe-18eaa0291333',
		name: '0312:Freshwater fishing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0312 Description: Freshwater fishing Explanatory Note Inclusion: This class includes:\n- fishing on a commercial basis in inland waters\n- taking of freshwater crustaceans and molluscs\n- taking of freshwater aquatic animals\n\nThis class also includes:\n- gathering of freshwater materials Explanatory Note Exclusion: This class excludes:\n- processing of fish, crustaceans and molluscs, see 1020\n- fishing inspection, protection and patrol services, see 8423\n- fishing practiced for sport or recreation and related services, see 9319\n- operation of sport fishing preserves, see 9319',
	},
	{
		id: '7ff1dc79-5669-4791-ad93-ec258b1fc334',
		name: '8219:Photocopying, document preparation and other specialized office support act',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8219 Description: Photocopying, document preparation and other specialized office support activities Explanatory Note Inclusion: This class includes a variety of copying, document preparation and specialized office support activities. The document copying/printing activities included here cover only short-run type printing activities.\n\nThis class includes:\n- document preparation\n- document editing or proofreading \n- typing, word processing, or desktop publishing \n- secretarial support services\n- transcription of documents, and other secretarial services\n- letter or resume writing \n- provision of mailbox rental and other mailing activities (except direct mail advertising) \n- photocopying \n- duplicating\n- blueprinting\n- other document copying services without also providing printing services, such as offset printing, quick printing, digital printing, prepress services Explanatory Note Exclusion: This class excludes:\n- printing of documents (offset printing, quick printing etc.), see 1811\n- direct mail advertising, see 7310\n- specialized stenotype services such as court reporting, see 8299\n- public stenography services, see 8299',
	},
	{
		id: 'be931643-7fba-4a25-a11f-9c97dfd6d398',
		name: '322:Manufacture of musical instruments',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 322 Description: Manufacture of musical instruments Explanatory Note Inclusion: See class 3220. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '05f333bc-843d-45ae-8452-b31948f407b4',
		name: '4651:Wholesale of computers, computer peripheral equipment and software',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4651 Description: Wholesale of computers, computer peripheral equipment and software Explanatory Note Inclusion: This class includes:\n- wholesale of computers and computer peripheral equipment\n- wholesale of software Explanatory Note Exclusion: This class excludes:\n- wholesale of electronic parts, see 4652\n- wholesale of office machinery and equipment, (except computers and peripheral equipment), see 4659\n- wholesale of computer-controlled machinery, see 4659',
	},
	{
		id: '698316f5-3629-4e39-b4c7-65ad332319db',
		name: '0124:Growing of pome fruits and stone fruits',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0124 Description: Growing of pome fruits and stone fruits Explanatory Note Inclusion: This class includes:\n- growing of pome fruits and stone fruits:\n* apples\n* apricots\n* cherries and sour cherries\n* peaches and nectarines\n* pears and quinces\n* plums and sloes\n* other pome fruits and stone fruits Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4ed9145e-8e3d-4092-88c7-6f2d01aca4c5',
		name: '822:Activities of call centres',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 822 Description: Activities of call centres Explanatory Note Inclusion: See class 8220. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a3cdde12-e0e2-4f67-b5fb-44ea55c389a4',
		name: '641:Monetary intermediation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 641 Description: Monetary intermediation Explanatory Note Inclusion: This group includes the obtaining of funds in the form of transferable deposits, i.e. funds that are fixed in money terms, obtained on a day-to-day basis and, apart from central banking, obtained from non-financial sources. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e6ebcaba-82ab-44e2-8af6-dcf9588253f9',
		name: '77:Rental and leasing activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 77 Description: Rental and leasing activities Explanatory Note Inclusion: This division includes the renting and leasing of tangible and non-financial intangible assets, including a wide array of tangible goods, such as automobiles, computers, consumer goods and industrial machinery and equipment to customers in return for a periodic rental or lease payment. It is subdivided into: (1) the renting of motor vehicles, (2) the renting of recreational and sports equipment and personal and household equipment, (3) the leasing of other machinery and equipment of the kind often used for business operations, including other transport equipment and (4) the leasing of intellectual property products and similar products.\n\nOnly the provision of operating leases is included in this division.\n\nThis division excludes financial leasing activities (see class 6491), renting of real estate (see section L) and the renting of equipment with operator. The latter is classified according to the activities carried out with this equipment, e.g. construction (section F) or transportation (section H). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e712ff56-0021-4f5b-be28-921fb551ad54',
		name: '1623:Manufacture of wooden containers',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 1623 Description: Manufacture of wooden containers Explanatory Note Inclusion: This class includes:\n- manufacture of packing cases, boxes, crates, drums and similar packings of wood\n- manufacture of pallets, box pallets and other load boards of wood\n- manufacture of barrels, vats, tubs and other coopers' products of wood\n- manufacture of wooden cable-drums Explanatory Note Exclusion: This class excludes:\n- manufacture of luggage, see 1512\n- manufacture of cases of plaiting material, see 1629",
	},
	{
		id: '96518153-e765-48e2-a208-cda2fb147670',
		name: '920:Gambling and betting activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 920 Description: Gambling and betting activities Explanatory Note Inclusion: See class 9200. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'bdaca06b-b0f5-4844-861a-7d6594fd1c22',
		name: '871:Residential nursing care facilities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 871 Description: Residential nursing care facilities Explanatory Note Inclusion: See class 8710. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5e0bb151-de66-49c4-b8bb-eca71baaf957',
		name: '7410:Specialized design activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7410 Description: Specialized design activities Explanatory Note Inclusion: This class includes:\n- fashion design related to textiles, wearing apparel, shoes, jewelry, furniture and other interior decoration and other fashion goods as well as other personal or household goods\n- industrial design, i.e. creating and developing designs and specifications that optimize the use, value and appearance of products, including the determination of the materials, construction, mechanism, shape, colour and surface finishes of the product, taking into consideration human characteristics and needs, safety, market appeal and efficiency in production, distribution, use and maintenance\n- activities of graphic designers\n- activities of interior decorators Explanatory Note Exclusion: This class excludes:\n- design and programming of web pages, see 6201\n- architectural design, see 7110\n- engineering design, i.e. applying physical laws and principles of engineering in the design of machines, materials, instruments, structures, processes and systems, see 7110\n- theatrical stage-set design, see 9000',
	},
	{
		id: '5493f490-6189-429f-b0d7-f26c038ca1c2',
		name: '0115:Growing of tobacco',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0115 Description: Growing of tobacco Explanatory Note Inclusion: This class includes:\n- growing of unmanufactured tobacco Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e605a3dc-5a26-4fcc-b497-5bfbc03583a8',
		name: '7990:Other reservation service and related activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7990 Description: Other reservation service and related activities Explanatory Note Inclusion: This class includes:\n- provision of other travel-related reservation services:\n* reservations for transportation, hotels, restaurants, car rentals, entertainment and sport etc.\n- provision of time-share exchange services\n- ticket sales activities for theatrical, sports and other amusement and entertainment events\n- provision of visitor assistance services:\n* provision of travel information to visitors\n* activities of tourist guides\n- tourism promotion activities Explanatory Note Exclusion: This class excludes:\n- activities of travel agencies and tour operators, see 7911, 7912\n- organization and management of events such as meetings, conventions and conferences, see 8230',
	},
	{
		id: 'e7efefaa-8e4b-4808-97ff-27c990a7999c',
		name: '5913:Motion picture, video and television programme distribution activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5913 Description: Motion picture, video and television programme distribution activities Explanatory Note Inclusion: This class includes:\n- distributing film, video tapes, DVDs and similar productions to motion picture theatres, television networks and stations and exhibitors\n\nThis class also includes:\n- acquiring film, video tape and DVD distribution rights Explanatory Note Exclusion: This class excludes:\n- film duplicating (except reproduction of motion picture film for theatrical distribution) as well as reproduction of audio and video tapes, CDs or DVDs from master copies, see 1820\n- reproduction of motion picture film for theatrical distribution, see 5912',
	},
	{
		id: 'e7eb4310-ec1e-4a3b-ab4c-1b722c102e0a',
		name: '861:Hospital activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 861 Description: Hospital activities Explanatory Note Inclusion: See class 8610. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b6182e03-8b3c-4e3e-b5d1-322032d2c4bf',
		name: '84:Public administration and defence; compulsory social security',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 84 Description: Public administration and defence; compulsory social security Explanatory Note Inclusion: See section O. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9225d0d0-d708-44c6-8098-a05a0e90098f',
		name: '801:Private security activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 801 Description: Private security activities Explanatory Note Inclusion: See class 8010. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '072976da-35f1-4afe-bad1-dbb458efcd1e',
		name: '2399:Manufacture of other non-metallic mineral products n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2399 Description: Manufacture of other non-metallic mineral products n.e.c. Explanatory Note Inclusion: This class includes:\n- manufacture of millstones, sharpening or polishing stones and natural or artificial abrasive products, including abrasive products on a soft base (e.g. sandpaper)\n- manufacture of friction material and unmounted articles thereof with a base of mineral substances or of cellulose\n- manufacture of mineral insulating materials:\n* slag wool, rock wool and similar mineral wools; exfoliated vermiculite, expanded clays and similar heat-insulating, sound-insulating or sound-absorbing materials\n- manufacture of articles of diverse mineral substances:\n* worked mica and articles of mica, of peat, of graphite (other than electrical articles) etc. \n- manufacture of articles of asphalt or similar material, e.g. asphalt-based adhesives, coal tar pitch etc.\n- carbon and graphite fibers and products (except electrodes and electrical applications) Explanatory Note Exclusion: This class excludes:\n- manufacture of glass wool and non-woven glass wool products, see 2310\n- manufacture of carbon or graphite gaskets, see 2819',
	},
	{
		id: '10ffa86e-aa50-4ae3-8284-9c85ffba3a7f',
		name: 'G:Wholesale and retail trade; repair of motor vehicles and motorcycles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: G Description: Wholesale and retail trade; repair of motor vehicles and motorcycles Explanatory Note Inclusion: This section includes wholesale and retail sale (i.e. sale without transformation) of any type of goods and the rendering of services incidental to the sale of these goods. Wholesaling and retailing are the final steps in the distribution of goods. Goods bought and sold are also referred to as merchandise.\n\nAlso included in this section are the repair of motor vehicles and motorcycles.\n\nSale without transformation is considered to include the usual operations (or manipulations) associated with trade, for example sorting, grading and assembling of goods, mixing (blending) of goods (for example sand), bottling (with or without preceding bottle cleaning), packing, breaking bulk and repacking for distribution in smaller lots, storage (whether or not frozen or chilled), cleaning and drying of agricultural products, cutting out of wood fibreboards or metal sheets as secondary activities.\n\nDivision 45 includes all activities related to the sale and repair of motor vehicles and motorcycles, while divisions 46 and 47 include all other sale activities. The distinction between division 46 (wholesale) and division 47 (retail sale) is based on the predominant type of customer.\n\nWholesale is the resale (sale without transformation) of new and used goods to retailers, to industrial, commercial, institutional or professional users, or to other wholesalers, or involves acting as an agent or broker in buying goods for, or selling goods to, such persons or companies. The principal types of businesses included are merchant wholesalers, i.e. wholesalers who take title to the goods they sell, such as wholesale merchants or jobbers, industrial distributors, exporters, importers, and cooperative buying associations, sales branches and sales offices (but not retail stores) that are maintained by manufacturing or mining units apart from their plants or mines for the purpose of marketing their products and that do not merely take orders to be filled by direct shipments from the plants or mines. Also included are merchandise brokers, commission merchants and agents and assemblers, buyers and cooperative associations engaged in the marketing of farm products. Wholesalers frequently physically assemble, sort and grade goods in large lots, break bulk, repack and redistribute in smaller lots, for example pharmaceuticals; store, refrigerate, deliver and install goods, engage in sales promotion for their customers and label design. \n\nRetailing is the resale (sale without transformation) of new and used goods mainly to the general public for personal or household consumption or utilization, by shops, department stores, stalls, mail-order houses, door-to-door sales persons, hawkers and peddlers, consumer cooperatives, auction houses etc. Most retailers take title to the goods they sell, but some act as agents for a principal and sell either on consignment or on a commission basis. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2bf228b6-1a1b-4bb8-a5d2-54026dbd247c',
		name: '6810:Real estate activities with own or leased property',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6810 Description: Real estate activities with own or leased property Explanatory Note Inclusion: This class includes:\n- buying, selling, renting and operating of self-owned or leased real estate, such as:\n* apartment buildings and dwellings\n* non-residential buildings, including exhibition halls, self-storage facilities, malls and shopping centers\n* land\n- provision of homes and furnished or unfurnished flats or apartments for more permanent use, typically on a monthly or annual basis\n\nThis class also includes:\n- development of building projects for own operation, i.e. for renting of space in these buildings\n- subdividing real estate into lots, without land improvement\n- operation of residential mobile home sites Explanatory Note Exclusion: This class excludes:\n- development of building projects for sale, see 4100\n- subdividing and improving of land, see 4290\n- operation of hotels, suite hotels and similar accommodation, see 5510\n- operation of campgrounds, trailer parks and similar accommodation, see 5520\n- operation of workers hostels, rooming houses and similar accommodation, see 5590',
	},
	{
		id: '0bcd87d5-d27d-4218-baba-4fe1ad21c790',
		name: '142:Manufacture of articles of fur',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 142 Description: Manufacture of articles of fur Explanatory Note Inclusion: See class 1420. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '891f9e09-c029-49b1-a3c9-81c2b4888431',
		name: '58:Publishing activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 58 Description: Publishing activities Explanatory Note Inclusion: This division includes the publishing of books, brochures, leaflets, dictionaries, encyclopaedias, atlases, maps and charts; publishing of newspapers, journals and periodicals; directory and mailing list and other publishing, as well as software publishing.\n\nPublishing includes the acquisition of copyrights to content (information products) and making this content available to the general public by engaging in (or arranging for) the reproduction and distribution of this content in various forms. All the feasible forms of publishing (in print, electronic or audio form, on the Internet, as multimedia products such as CD-ROM reference books etc.), except publishing of motion pictures, are included in this division.\n\nThis division excludes the publishing of motion pictures, video tapes and movies on DVD or similar media (division 59) and the production of master copies for records or audio material (division 59). Also excluded are printing (see 1811) and the mass reproduction of recorded media (see 1820). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4829a565-4f49-443e-a14e-6ac2ff76c4a3',
		name: '8413:Regulation of and contribution to more efficient operation of businesses',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8413 Description: Regulation of and contribution to more efficient operation of businesses Explanatory Note Inclusion: This class includes:\n- public administration and regulation, including subsidy allocation, for different economic sectors: \n* agriculture\n* land use\n* energy and mining resources\n* infrastructure\n* transport\n* communication\n* hotels and tourism\n* wholesale and retail trade\n- administration of R&D policies and associated funds to improve economic performance\n- administration of general labour affairs\n- implementation of regional development policy measures, e.g. to reduce unemployment Explanatory Note Exclusion: This class excludes:\n- research and experimental development activities, see division 72',
	},
	{
		id: '1d003898-c1cd-4d37-9d3d-31661ab60561',
		name: '68:Real estate activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 68 Description: Real estate activities Explanatory Note Inclusion: See section L. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '3b2d4aa9-cfc4-40bc-82f3-ba3f3cac564f',
		name: '4649:Wholesale of other household goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4649 Description: Wholesale of other household goods Explanatory Note Inclusion: This class includes:\n- wholesale of household furniture\n- wholesale of household appliances\n- wholesale of consumer electronics:\n* radio and TV equipment\n* CD and DVD players and recorders\n* stereo equipment\n* video game consoles\n- wholesale of lighting equipment\n- wholesale of cutlery\n- wholesale of china and glassware\n- wholesale of woodenware, wickerwork and corkware etc.\n- wholesale of pharmaceutical and medical goods\n- wholesale of perfumeries, cosmetics and soaps\n- wholesale of bicycles and their parts and accessories\n- wholesale of stationery, books, magazines and newspapers\n- wholesale of photographic and optical goods (e.g. sunglasses, binoculars, magnifying glasses)\n- wholesale of recorded audio and video tapes, CDs, DVDs\n- wholesale of leather goods and travel accessories\n- wholesale of watches, clocks and jewellery\n- wholesale of musical instruments, games and toys, sports goods Explanatory Note Exclusion: This class excludes:\n- wholesale of blank audio and video tapes, CDs, DVDs, see 4652\n- wholesale of radio and TV broadcasting equipment, see 4652\n- wholesale of office furniture, see 4659',
	},
	{
		id: '2bafcf35-7782-457c-acd9-c61a0f035297',
		name: '4752:Retail sale of hardware, paints and glass in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4752 Description: Retail sale of hardware, paints and glass in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of hardware\n- retail sale of paints, varnishes and lacquers\n- retail sale of flat glass\n- retail sale of other building material such as bricks, wood, sanitary equipment\n- retail sale of do-it-yourself material and equipment\n\nThis class also includes:\n- retail sale of lawnmowers, however operated\n- retail sale of saunas Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd8321aca-15d7-40e1-b784-e7004867c402',
		name: '3290:Other manufacturing n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 3290 Description: Other manufacturing n.e.c. Explanatory Note Inclusion: This class includes:\n- manufacture of protective safety equipment\n* manufacture of fire-resistant and protective safety clothing\n* manufacture of linemen's safety belts and other belts for occupational use\n* manufacture of cork life preservers\n* manufacture of plastics hard hats and other personal safety equipment of plastics (e.g. athletic helmets)\n* manufacture of fire-fighting protection suits\n* manufacture of metal safety headgear and other metal personal safety devices\n* manufacture of ear and noise plugs (e.g. for swimming and noise protection)\n* manufacture of gas masks\n- manufacture of brooms and brushes, including brushes constituting parts of machines, hand-operated mechanical floor sweepers, mops and feather dusters, paint brushes, paint pads and rollers, squeegees and other brushes, brooms, mops etc.\n- manufacture of shoe and clothes brushes\n- manufacture of pens and pencils of all kinds whether or not mechanical\n- manufacture of pencil leads\n- manufacture of date, sealing or numbering stamps, hand-operated devices for printing, or embossing labels, hand printing sets, prepared typewriter ribbons and inked pads\n- manufacture of globes\n- manufacture of umbrellas, sun-umbrellas, walking sticks, seat-sticks\n- manufacture of buttons, press-fasteners, snap-fasteners, press-studs, slide fasteners\n- manufacture of cigarette lighters\n- manufacture of articles of personal use: smoking pipes, scent sprays, vacuum flasks and other vacuum vessels for personal or household use, wigs, false beards, eyebrows\n- manufacture of miscellaneous articles: candles, tapers and the like; bouquets, wreaths and floral baskets; artificial flowers, fruit and foliage; jokes and novelties; hand sieves and hand riddles; tailors' dummies; burial caskets etc.\n- taxidermy activities Explanatory Note Exclusion: This class excludes:\n- manufacture of lighter wicks, see 1399\n- manufacture of workwear and service apparel (e.g. laboratory coats, work overalls, uniforms), see 1410\n- manufacture of paper novelties, see 1709\n- manufacture of plastic novelties, see 2220",
	},
	{
		id: 'bbe2eb06-fac9-48bb-9610-f402b9d3f2d0',
		name: '0161:Support activities for crop production',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0161 Description: Support activities for crop production Explanatory Note Inclusion: This class includes:\n- agricultural activities on a fee or contract basis:\n* preparation of fields\n* establishing a crop\n* treatment of crops\n* crop spraying, including by air\n* trimming of fruit trees and vines\n* transplanting of rice, thinning of beets\n* harvesting\n* pest control (including rabbits) in connection with agriculture\n- operation of agricultural irrigation equipment\n\nThis class also includes:\n- provision of agricultural machinery with operators and crew\n- maintenance of land to keep it in good condition for agricultural use Explanatory Note Exclusion: This class excludes:\n- post-harvest crop activities, see 0163\n- activities of agronomists and agricultural economists, see 7490\n- landscape architecture, see 7110\n- landscape gardening, planting, see 8130\n- maintenance of land to keep it in good ecological condition, see 8130\n- organization of agricultural shows and fairs, see 8230',
	},
	{
		id: 'ec08744a-ac2b-418a-8840-dc6b416df9ad',
		name: '2750:Manufacture of domestic appliances',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2750 Description: Manufacture of domestic appliances Explanatory Note Inclusion: This class includes the manufacture of small electric appliances and electric housewares, household-type fans, household-type vacuum cleaners, electric household-type floor care machines, household-type cooking appliances, household-type laundry equipment, household-type refrigerators, upright and chest freezers and other electrical and non-electrical household appliances, such as dishwashers, water heaters and garbage disposal units. This class includes the manufacture of appliances with electric, gas or other fuel sources.\n\nThis class includes:\n- manufacture of domestic electric appliances:\n* refrigerators \n* freezers\n* dishwashers\n* washing and drying machines\n* vacuum cleaners\n* floor polishers\n* waste disposers\n* grinders, blenders, juice squeezers\n* tin openers\n* electric shavers, electric toothbrushes and other electric personal care device\n* knife sharpeners\n* ventilating or recycling hoods\n- manufacture of domestic electrothermic appliances:\n* electric water heaters\n* electric blankets\n* electric dryers, combs, brushes, curlers\n* electric smoothing irons\n* space heaters and household-type fans, portable\n* electric ovens\n* microwave ovens\n* cookers, hotplates\n* toasters\n* coffee or tea makers\n* fry pans, roasters, grills, hoods\n* electric heating resistors etc.\n- manufacture of domestic non-electric cooking and heating equipment:\n* non-electric space heaters, cooking ranges, grates, stoves, water heaters, cooking appliances, plate warmers Explanatory Note Exclusion: This class excludes:\n- manufacture of commercial and industrial refrigerators and freezers, room air-conditioners, attic fans, permanent mount space heaters and commercial ventilation and exhaust fans, commercial-type cooking equipment; commercial-type laundry, dry-cleaning and pressing equipment; commercial, industrial and institutional vacuum cleaners, see division 28\n- manufacture of household-type sewing machines, see 2826\n- installation of central vacuum cleaning systems, 4329',
	},
	{
		id: '209749a0-e38f-4491-835b-2c6eda118cec',
		name: '2513:Manufacture of steam generators, except central heating hot water boilers',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2513 Description: Manufacture of steam generators, except central heating hot water boilers Explanatory Note Inclusion: This class includes:\n- manufacture of steam or other vapour generators\n- manufacture of auxiliary plant for use with steam generators:\n* condensers, economizers, superheaters, steam collectors and accumulators\n- manufacture of nuclear reactors, except isotope separators\n- manufacture of parts for marine or power boilers Explanatory Note Exclusion: This class excludes:\n- manufacture of central heating hot-water boilers and radiators, see 2512\n- manufacture of boiler-turbine sets, see 2811\n- manufacture of isotope separators, see 2829',
	},
	{
		id: '26d9e4bc-3629-449e-88c4-407997ddc84c',
		name: '390:Remediation activities and other waste management services',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 390 Description: Remediation activities and other waste management services Explanatory Note Inclusion: See class 3900. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'eae96d10-62a8-433c-8d5d-c332395170ad',
		name: '466:Other specialized wholesale',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 466 Description: Other specialized wholesale Explanatory Note Inclusion: This group includes other specialized wholesale activities not classified in other groups of this division. This includes the wholesale of intermediate products, except agricultural, typically not for household use. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5ce22aa6-8cc3-471f-a4e2-6184090afb92',
		name: 'H:Transportation and storage',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: H Description: Transportation and storage Explanatory Note Inclusion: This section includes the provision of passenger or freight transport, whether scheduled or not, by rail, pipeline, road, water or air and associated activities such as terminal and parking facilities, cargo handling, storage etc. Included in this section is the renting of transport equipment with driver or operator. Also included are postal and courier activities.\n\nThis section excludes maintenance and repair of motor vehicles and other transportation equipment (see classes 4520 and 3315, respectively), the construction, maintenance and repair of roads, railroads, harbours, airfields (see classes 4210 and 4290), as well as the renting of transport equipment without driver or operator (see classes 7710 and 7730). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '667330cf-66b2-4f68-811d-407103c94723',
		name: '469:Non-specialized wholesale trade',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 469 Description: Non-specialized wholesale trade Explanatory Note Inclusion: See class 4690. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8c080627-7417-484e-9086-c469a8114cc4',
		name: '2910:Manufacture of motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2910 Description: Manufacture of motor vehicles Explanatory Note Inclusion: This class includes:\n- manufacture of passenger cars\n- manufacture of commercial vehicles:\n* vans, lorries, over-the-road tractors for semi-trailers etc.\n- manufacture of buses, trolley-buses and coaches\n- manufacture of motor vehicle engines\n- manufacture of chassis fitted with engines\n- manufacture of other motor vehicles:\n* snowmobiles, golf carts, amphibious vehicles\n* fire engines, street sweepers, travelling libraries, armoured cars etc.\n* concrete-mixer lorries\n- ATVs, go-carts and similar including race cars\n\nThis class also includes:\n- factory rebuilding of motor vehicle engines Explanatory Note Exclusion: This class excludes:\n- manufacture of lighting equipment for motor vehicles, see 2740\n- manufacture of pistons, piston rings and carburetors, see 2811\n- manufacture of agricultural tractors, see 2821\n- manufacture of tractors used in construction or mining, see 2824\n- manufacture of off-road dumping trucks, see 2824\n- manufacture of bodies for motor vehicles, see 2920\n- manufacture of electrical parts for motor vehicles, see 2930\n- manufacture of parts and accessories for motor vehicles, see 2930\n- manufacture of tanks and other military fighting vehicles, see 3040\n- maintenance, repair and alteration of motor vehicles, see 4520',
	},
	{
		id: '50c36d6b-c003-4a7a-b88e-eeda9353187b',
		name: '382:Waste treatment and disposal',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 382 Description: Waste treatment and disposal Explanatory Note Inclusion: This group includes the disposal and treatment prior to disposal of various forms of waste by different means, such as waste treatment of organic waste with the aim of disposal; treatment and disposal of toxic live or dead animals and other contaminated waste; treatment and disposal of transition radioactive waste from hospitals, etc.; dumping of refuse on land or in water; burial or ploughing-under of refuse; disposal of used goods such as refrigerators to eliminate harmful waste; disposal of waste by incineration or combustion.\nIncluded is also the generation of electricity resulting from waste incineration processes. Explanatory Note Exclusion: This group excludes:\n- treatment and disposal of wastewater, see 3700',
	},
	{
		id: '50437c54-b03f-4dd9-b8da-4aefa7d652bb',
		name: '7710:Renting and leasing of motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7710 Description: Renting and leasing of motor vehicles Explanatory Note Inclusion: This class includes:\n- renting and operational leasing of the following types of vehicles:\n* passenger cars (without drivers)\n* trucks, utility trailers and recreational vehicles Explanatory Note Exclusion: This class excludes:\n- renting or leasing of vehicles or trucks with driver, see 4922, 4923\n- financial leasing, see 6491',
	},
	{
		id: 'c5c111f2-7555-4858-a8c4-2fe82e255c7f',
		name: '3811:Collection of non-hazardous waste',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3811 Description: Collection of non-hazardous waste Explanatory Note Inclusion: This class includes:\n- collection of non-hazardous solid waste (i.e. garbage) within a local area, such as collection of waste from households and businesses by means of refuse bins, wheeled bins, containers etc may include mixed recoverable materials\n- collection of recyclable materials\n- collection of used cooking oils and fats\n- collection of refuse in litter-bins in public places\n\nThis class also includes:\n- collection of construction and demolition waste\n- collection and removal of debris such as brush and rubble\n- collection of waste output of textile mills\n- operation of waste transfer stations for non-hazardous waste Explanatory Note Exclusion: This class excludes:\n- collection of hazardous waste, see 3812\n- operation of landfills for the disposal of non-hazardous waste, see 3821\n- operation of facilities where commingled recoverable materials such as paper, plastics, etc. are sorted into distinct categories, see 3830',
	},
	{
		id: 'd4a532f6-4c8d-41b2-93c5-2a7c5ae280a5',
		name: '702:Management consultancy activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 702 Description: Management consultancy activities Explanatory Note Inclusion: See class 7020. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '6819a9fe-25f0-47ae-a3e8-1eec2d59bb78',
		name: '4721:Retail sale of food in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4721 Description: Retail sale of food in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of any the following types of goods:\n* fresh or preserved fruit and vegetables\n* dairy products and eggs\n* meat and meat products (including poultry)\n* fish, other seafood and products thereof\n* bakery products\n* sugar confectionery\n* other food products Explanatory Note Exclusion: This class excludes:\n- manufacturing of bakery products, i.e. baking on premises, see 1071',
	},
	{
		id: 'bf60e093-5578-4803-8635-e9c4c69db37d',
		name: '511:Passenger air transport',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 511 Description: Passenger air transport Explanatory Note Inclusion: See class 5110. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '165c94b4-2077-4382-94a6-df08f4d1603f',
		name: '61:Telecommunications',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 61 Description: Telecommunications Explanatory Note Inclusion: This division includes the activities of providing telecommunications and related service activities, i.e. transmitting voice, data, text, sound and video. The transmission facilities that carry out these activities may be based on a single technology or a combination of technologies. The commonality of activities classified in this division is the transmission of content, without being involved in its creation. The breakdown in this division is based on the type of infrastructure operated.\nIn the case of transmission of television signals this may include the bundling of complete programming channels (produced in division 60) in to programme packages for distribution. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8980edb1-32cb-4205-a28b-1eab2da55975',
		name: '24:Manufacture of basic metals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 24 Description: Manufacture of basic metals Explanatory Note Inclusion: This division includes the activities of smelting and/or refining ferrous and non-ferrous metals from ore, pig or scrap, using electrometallurgic and other process metallurgic techniques. This division also includes the manufacture of metal alloys and super-alloys by introducing other chemical elements to pure metals. The output of smelting and refining, usually in ingot form, is used in rolling, drawing and extruding operations to make products such as plate, sheet, strip, bars, rods, wire, tubes, pipes and hollow profiles, and in molten form to make castings and other basic metal products. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5f0b3fc0-20f3-4ada-b690-21c2a9b4ab7e',
		name: '265:Manufacture of measuring, testing, navigating and control equipment; watches',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 265 Description: Manufacture of measuring, testing, navigating and control equipment; watches and clocks Explanatory Note Inclusion: This group includes the manufacture of measuring, testing, navigating and control equipment for various industrial and non-industrial purposes, including time-based measuring devices such as watches and clocks and related devices. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b0b0a379-1207-40d9-9211-17238c740365',
		name: '6430:Trusts, funds and similar financial entities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6430 Description: Trusts, funds and similar financial entities Explanatory Note Inclusion: This class includes legal entities organized to pool securities or other financial assets, without managing, on behalf of shareholders or beneficiaries. The portfolios are customized to achieve specific investment characteristics, such as diversification, risk, rate of return and price volatility. These entities earn interest, dividends and other property income, but have little or no employment and no revenue from the sale of services.\n\nThis class includes:\n- open-end investment funds\n- closed-end investment funds\n- trusts, estates or agency accounts, administered on behalf of the beneficiaries under the terms of a trust agreement, will or agency agreement\n- unit investment trust funds Explanatory Note Exclusion: This class excludes:\n- funds and trusts that earn revenue from the sale of goods or services, see ISIC class according to their principal activity\n- activities of holding companies, see 6420\n- pension funding, see 6530\n- management of funds, see 6630',
	},
	{
		id: 'e05dcfa5-a50d-4dc8-8174-29b8fdc163e4',
		name: '2219:Manufacture of other rubber products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2219 Description: Manufacture of other rubber products Explanatory Note Inclusion: This class includes:\n- manufacture of other products of natural or synthetic rubber, unvulcanized, vulcanized or hardened:\n* rubber plates, sheets, strip, rods, profile shapes\n* tubes, pipes and hoses\n* rubber conveyor or transmission belts or belting\n* rubber hygienic articles: sheath contraceptives, teats, hot water bottles etc.\n* rubber articles of apparel (if only sealed together, not sewn)\n* rubber thread and rope\n* rubberized yarn and fabrics\n* rubber rings, fittings and seals\n* rubber roller coverings\n* inflatable rubber mattresses\n* inflatable balloons\n- manufacture of rubber brushes\n- manufacture of hard rubber pipe stems\n- manufacture of hard rubber combs, hair pins, hair rollers, and similar\n\nThis class also includes:\n- manufacture of rubber repair materials\n- manufacture of textile fabric impregnated, coated, covered or laminated with rubber, where rubber is the chief constituent\n- manufacture of rubber waterbed mattresses\n- manufacture of rubber bathing caps and aprons\n- manufacture of rubber wet suits and diving suits\n- manufacture of rubber sex articles Explanatory Note Exclusion: This class excludes:\n- manufacture of tyre cord fabrics, see 1399\n- manufacture of apparel of elastic fabrics, see 1410\n- manufacture of rubber footwear, see 1520\n- manufacture of glues and adhesives based on rubber, see 2029\n- manufacture of "camelback" strips, see 2211\n- manufacture of inflatable rafts and boats, see 3011, 3012\n- manufacture of mattresses of uncovered cellular rubber, see 3100\n- manufacture of rubber sports requisites, except apparel, see 3230\n- manufacture of rubber games and toys (including children\'s wading pools, inflatable children rubber boats, inflatable rubber animals, balls and the like), see 3240\n- reclaiming of rubber, see 3830',
	},
	{
		id: '57576906-1fe0-4105-b904-91f03d66057f',
		name: '1311:Preparation and spinning of textile fibres',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1311 Description: Preparation and spinning of textile fibres Explanatory Note Inclusion: This class includes:\n- preparatory operations on textile fibres:\n* reeling and washing of silk\n* degreasing and carbonizing of wool and dyeing of wool fleece\n* carding and combing of all kinds of animal, vegetable and man-made fibres\n- spinning and manufacture of yarn or thread for weaving or sewing, for the trade or for further processing:\n* texturizing, twisting, folding, cabling and dipping of synthetic or artificial filament yarns\n\nThis class also includes:\n- manufacture of paper yarn Explanatory Note Exclusion: This class excludes:\n- preparatory operations carried out in combination with agriculture or farming, see division 01\n- retting of plants bearing vegetable textile fibres (jute, flax, coir etc.), see 0116\n- cotton ginning, see 0163\n- manufacture of synthetic or artificial fibres and tows, manufacture of single yarns (including high-tenacity yarn and yarn for carpets) of synthetic or artificial fibres, see 2030\n- manufacture of glass fibres, see 2310',
	},
	{
		id: '04b5cecf-67f2-45b7-9524-897083f0c831',
		name: '2630:Manufacture of communication equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2630 Description: Manufacture of communication equipment Explanatory Note Inclusion: This class includes the manufacture of telephone and data communications equipment used to move signals electronically over wires or through the air such as radio and television broadcast and wireless communications equipment.\n\nThis class includes:\n- manufacture of central office switching equipment\n- manufacture of cordless telephones\n- manufacture of private branch exchange (PBX) equipment\n- manufacture of telephone and facsimile equipment, including telephone answering machines\n- manufacture of data communications equipment, such as bridges, routers, and gateways\n- manufacture of transmitting and receiving antenna\n- manufacture of cable television equipment\n- manufacture of pagers\n- manufacture of cellular phones\n- manufacture of mobile communication equipment\n- manufacture of radio and television studio and broadcasting equipment, including television cameras\n- manufacture of modems, carrier equipment\n- manufacture of burglar and fire alarm systems, sending signals to a control station\n- manufacture of radio and television transmitters\n- manufacture of infrared devices (e.g. remote controls) Explanatory Note Exclusion: This class excludes:\n- manufacture of computers and computer peripheral equipment, see 2620\n- manufacture of consumer audio and video equipment, see 2640\n- manufacture of electronic components and subassemblies used in communications equipment, see 2610\n- manufacture of internal/external computer modems (PC-type), see 2610\n- manufacture of electronic scoreboards, see 2790\n- manufacture of traffic lights, see 2790',
	},
	{
		id: '371d5770-4661-41e7-a6ff-e494fd001a11',
		name: 'C31-C32: Manufacture of furniture; other manufacturing',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Manufacture of furniture; other manufacturing',
	},
	{
		id: 'afb2b136-a2c0-402b-83b6-08e106267df2',
		name: '1512:Manufacture of luggage, handbags and the like, saddlery and harness',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 1512 Description: Manufacture of luggage, handbags and the like, saddlery and harness Explanatory Note Inclusion: This class includes:\n- manufacture of luggage, handbags and the like, of leather, composition leather or any other material, such as plastic sheeting, textile materials, vulcanized fibre or paperboard, where the same technology is used as for leather\n- manufacture of saddlery and harness\n- manufacture of non-metallic watch bands (e.g. fabric, leather, plastic)\n- manufacture of diverse articles of leather or composition leather: driving belts, packings etc.\n- manufacture of shoe-lace, of leather\n- manufacture of horse whips and riding crops Explanatory Note Exclusion: This class excludes:\n- manufacture of leather wearing apparel, see 1410\n- manufacture of leather gloves and hats, see 1410\n- manufacture of footwear, see 1520\n- manufacture of saddles for bicycles, see 3092\n- manufacture of precious metal watch bands, see 3211\n- manufacture of non-precious metal watch bands, see 3212\n- manufacture of linemen's safety belts and other belts for occupational use, see 3290",
	},
	{
		id: 'aea14333-1d2c-4cee-bd8e-93bac615f500',
		name: '292:Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailer',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 292 Description: Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailers and semi-trailers Explanatory Note Inclusion: See class 2920. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ea73c92d-2174-4142-a044-bad535b4b442',
		name: '2731:Manufacture of fibre optic cables',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2731 Description: Manufacture of fibre optic cables Explanatory Note Inclusion: This class includes:\n- manufacture of fiber optic cable for data transmission or live transmission of images Explanatory Note Exclusion: This class excludes:\n- manufacture of glass fibres or strand, see 2310\n- manufacture of optical cable sets or assemblies with connectors or other attachments, see depending on application, e.g. 2610',
	},
	{
		id: '6804b0a0-3919-4d9b-b8c2-063db75178de',
		name: '682:Real estate activities on a fee or contract basis',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 682 Description: Real estate activities on a fee or contract basis Explanatory Note Inclusion: See class 6820. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'bcdab23b-5390-4d5d-9851-4cc65e19899f',
		name: '1079:Manufacture of other food products n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1079 Description: Manufacture of other food products n.e.c. Explanatory Note Inclusion: This class includes:\n- decaffeinating and roasting of coffee\n- production of coffee products:\n* ground coffee\n* soluble coffee\n* extracts and concentrates of coffee\n- manufacture of coffee substitutes\n- blending of tea and mat\u00e9\n- manufacture of extracts and preparations based on tea or mat\u00e9\n- manufacture of soups and broths\n- manufacture of special foods, such as:\n* infant formula\n* follow up milks and other follow up foods\n* baby foods\n* foods containing homogenized ingredients\n- manufacture of spices, sauces and condiments:\n* mayonnaise\n* mustard flour and meal\n* prepared mustard etc.\n- manufacture of vinegar\n- manufacture of artificial honey and caramel\n- manufacture of perishable prepared foods, such as:\n* sandwiches\n* fresh (uncooked) pizza\n\nThis class also includes:\n- manufacture of herb infusions (mint, vervain, chamomile etc.)\n- manufacture of yeast\n- manufacture of extracts and juices of meat, fish, crustaceans or molluscs\n- manufacture of non-dairy milk and cheese substitutes\n- manufacture of egg products, egg albumin\n- processing of salt into food-grade salt, e.g. iodized salt\n- manufacture of artificial concentrates Explanatory Note Exclusion: This class excludes:\n- growing of spice crops, see 0128\n- manufacture of inulin, see 1062\n- manufacture of perishable prepared foods of fruit and vegetables (e.g. salads, peeled vegetables, bean curd), see 1030\n- manufacture of frozen pizza, see 1075\n- manufacture of spirits, beer, wine and soft drinks, see division 11\n- preparation of botanical products for pharmaceutical use, see 2100',
	},
	{
		id: '79eb68a0-c5ae-4858-b029-01c178041c38',
		name: '6920:Accounting, bookkeeping and auditing activities; tax consultancy',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6920 Description: Accounting, bookkeeping and auditing activities; tax consultancy Explanatory Note Inclusion: This class includes:\n- recording of commercial transactions from businesses or others\n- preparation or auditing of financial accounts\n- examination of accounts and certification of their accuracy\n- preparation of personal and business income tax returns\n- advisory activities and representation on behalf of clients before tax authorities Explanatory Note Exclusion: This class excludes:\n- data-processing and tabulation activities, see 6311\n- management consultancy activities, such as design of accounting systems, cost accounting programmes, budgetary control procedures, see 7020\n- bill collection, see 8291',
	},
	{
		id: 'bb01a5a3-44a0-4c08-8365-23a0a8b192cb',
		name: '2670:Manufacture of optical instruments and photographic equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 2670 Description: Manufacture of optical instruments and photographic equipment Explanatory Note Inclusion: This class includes the manufacture of optical instruments and lenses, such as binoculars, microscopes (except electron, proton), telescopes, prisms and lenses (except ophthalmic); the coating or polishing of lenses (except ophthalmic); the mounting of lenses (except ophthalmic) and the manufacture of photographic equipment such as cameras and light meters.\n\nThis class includes:\n- manufacture of lenses and prisms\n- manufacture of optical microscopes, binoculars and telescopes\n- manufacture of optical mirrors\n- manufacture of optical magnifying instruments\n- manufacture of optical machinist's precision tools\n- manufacture of optical comparators\n- manufacture of optical gun sighting equipment\n- manufacture of optical positioning equipment\n- manufacture of optical measuring and checking devices and instruments (e.g. fire control equipment, photographic light meters, range finders)\n- manufacture of film cameras and digital cameras\n- manufacture of motion picture and slide projectors\n- manufacture of overhead transparency projectors\n- manufacture of laser assemblies\n\nThis class also includes:\n- coating, polishing and mounting of lenses Explanatory Note Exclusion: This class excludes:\n- manufacture of computer projectors, see 2620\n- manufacture of commercial TV and video cameras, see 2630\n- manufacture of household-type video cameras, see 2640\n- manufacture of electron and proton microscopes, see 2651\n- manufacture of complete equipment using laser components, see manufacturing class by type of machinery (e.g. medical laser equipment, see 2660)\n- manufacture of photocopy machinery, see 2817\n- manufacture of ophthalmic goods, see 3250",
	},
	{
		id: '1cadbcb6-d285-4679-8bf1-1421a4b39316',
		name: '6202:Computer consultancy and computer facilities management activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 6202 Description: Computer consultancy and computer facilities management activities Explanatory Note Inclusion: This class includes:\n- planning and designing of computer systems that integrate computer hardware, software and communication technologies\n\nThe units classified in this class may provide the hardware and software components of the system as part of their integrated services or these components may be provided by third parties or vendors. The units classified in this class often install the system and train and support the users of the system.\n\nThis class also includes:\n- provision of on-site management and operation of clients' computer systems and/or data processing facilities, as well as related support services Explanatory Note Exclusion: This class excludes:\n- separate sale of computer hardware or software, see 4651, 4741\n- separate installation of mainframe and similar computers, see 3320\n- separate installation (setting-up) of personal computers, see 6209\n- separate software installation, see 6209",
	},
	{
		id: 'bcfc0c7a-9fb2-4de7-b687-23c55fc83aac',
		name: '2920:Manufacture of bodies (coachwork) for motor vehicles; manufacture of traile',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2920 Description: Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailers and semi-trailers Explanatory Note Inclusion: This class includes:\n- manufacture of bodies, including cabs for motor vehicles\n- outfitting of all types of motor vehicles, trailers and semi-trailers\n- manufacture of trailers and semi-trailers:\n* for transport of goods: tankers, removal trailers etc.\n* for transport of passengers: caravan trailers etc.\n- manufacture of containers for carriage by one or more modes of transport Explanatory Note Exclusion: This class excludes:\n- manufacture of trailers and semi-trailers specially designed for use in agriculture, see 2821\n- manufacture of parts and accessories of bodies for motor vehicles, see 2930\n- manufacture of vehicles drawn by animals, see 3099',
	},
	{
		id: '8e064aa3-0620-416d-be4e-35f75eef11c4',
		name: 'A:Agriculture, forestry and fishing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: A Description: Agriculture, forestry and fishing Explanatory Note Inclusion: This section includes the exploitation of vegetal and animal natural resources, comprising the activities of growing of crops, raising and breeding of animals, harvesting of timber and other plants, animals or animal products from a farm or their natural habitats. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ebeb564d-0889-4b71-b303-1d6cb05408cf',
		name: '879:Other residential care activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 879 Description: Other residential care activities Explanatory Note Inclusion: See class 8790. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '61f30296-5f58-4f0e-a9cd-b091fea91a6e',
		name: '749:Other professional, scientific and technical activities n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 749 Description: Other professional, scientific and technical activities n.e.c. Explanatory Note Inclusion: See class 7490. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b4d84406-12cd-4bc0-a3ac-848cb9e22da3',
		name: '6311:Data processing, hosting and related activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6311 Description: Data processing, hosting and related activities Explanatory Note Inclusion: This class includes:\n- provision of infrastructure for hosting, data processing services and related activities\n- specialized hosting activities such as:\n* Web hosting\n* streaming services\n* application hosting\n- application service provisioning\n- general time-share provision of mainframe facilities to clients\n- data processing activities:\n* complete processing of data supplied by clients\n* generation of specialized reports from data supplied by clients\n- provision of data entry services Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0760caf0-f338-405d-bb20-8a0e5ec293de',
		name: '6910:Legal activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 6910 Description: Legal activities Explanatory Note Inclusion: This class includes:\n- legal representation of one party's interest against another party, whether or not before courts or other judicial bodies by, or under supervision of, persons who are members of the bar:\n* advice and representation in civil cases\n* advice and representation in criminal cases\n* advice and representation in connection with labour disputes\n- general counselling and advising, preparation of legal documents:\n* articles of incorporation, partnership agreements or similar documents in connection with company formation\n* patents and copyrights\n* preparation of deeds, wills, trusts etc.\n- other activities of notaries public, civil law notaries, bailiffs, arbitrators, examiners and referees Explanatory Note Exclusion: This class excludes:\n- law court activities, see 8423",
	},
	{
		id: 'fa61be71-7b34-46ad-9971-f85bb1cc6553',
		name: '3040:Manufacture of military fighting vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3040 Description: Manufacture of military fighting vehicles Explanatory Note Inclusion: This class includes:\n- manufacture of tanks\n- manufacture of armored amphibious military vehicles\n- manufacture of other military fighting vehicles Explanatory Note Exclusion: This class excludes:\n- manufacture of weapons and ammunitions, see 2520',
	},
	{
		id: 'e18d736e-5e3b-4e33-bd91-44edbb8016c7',
		name: '881:Social work activities without accommodation for the elderly and disabled',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 881 Description: Social work activities without accommodation for the elderly and disabled Explanatory Note Inclusion: See class 8810. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c6bfa9c8-b5ab-45f3-8c54-aad29d31a78f',
		name: '900:Creative, arts and entertainment activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 900 Description: Creative, arts and entertainment activities Explanatory Note Inclusion: See class 9000. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'cf4e16ce-baad-4a6a-ba62-ab2ec0bdb3c7',
		name: '7721:Renting and leasing of recreational and sports goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7721 Description: Renting and leasing of recreational and sports goods Explanatory Note Inclusion: This class includes:\n- renting of recreational and sports equipment:\n* pleasure boats, canoes, sailboats, \n* bicycles\n* beach chairs and umbrellas\n* other sports equipment\n* skis Explanatory Note Exclusion: This class excludes:\n- renting of video tapes and disks, see 7722\n- renting of other personal and household goods n.e.c., see 7729\n- renting of leisure and pleasure equipment as an integral part of recreational facilities, see 9329',
	},
	{
		id: '47e51285-722f-42d0-80d3-d3e70798786b',
		name: '701:Activities of head offices',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 701 Description: Activities of head offices Explanatory Note Inclusion: See class 7010. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '594192e2-423c-45e0-be90-2a869e23b96f',
		name: '6411:Central banking',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 6411 Description: Central banking Explanatory Note Inclusion: This class includes:\n- issuing and managing the country's currency\n- monitoring and control of the money supply\n- taking deposits that are used for clearance between financial institutions\n- supervising banking operations\n- holding the country's international reserves\n- acting as banker to the government\n\nThe activities of central banks will vary for institutional reasons. Explanatory Note Exclusion: [Empty]",
	},
	{
		id: '1f21b3ad-0baa-46b1-8b15-3592b0e873f4',
		name: '4741:Retail sale of computers, peripheral units, software and telecommunications',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4741 Description: Retail sale of computers, peripheral units, software and telecommunications equipment in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of computers\n- retail sale of computer peripheral equipment\n- retail sale of video game consoles\n- retail sale of non-customized software, including video games\n- retail sale of telecommunication equipment Explanatory Note Exclusion: This class excludes:\n- retail sale of blank tapes and disks, see 4762',
	},
	{
		id: '371faa18-8f1f-43e3-bd03-6cae65d3ceaf',
		name: '464:Wholesale of household goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 464 Description: Wholesale of household goods Explanatory Note Inclusion: This group includes the wholesale of household goods, including textiles. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c68582e4-0767-40fe-8c98-a310b9666f5b',
		name: '59:Motion picture, video and television programme production, sound recording an',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 59 Description: Motion picture, video and television programme production, sound recording and music publishing activities Explanatory Note Inclusion: This division includes production of theatrical and non-theatrical motion pictures whether on film, videotape or disc for direct projection in theatres or for broadcasting on television; supporting activities such as film editing, cutting, dubbing etc.; distribution of motion pictures and other film productions to other industries; as well as motion picture or other film productions projection. Also included is the buying and selling of distribution rights for motion pictures or other film productions.\nThis division also includes the sound recording activities, i.e. production of original sound master recordings, releasing, promoting and distributing them, publishing of music as well as sound recording service activities in a studio or elsewhere. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ed52ec57-bc32-4378-9fd5-b847ee32b3f4',
		name: '8620:Medical and dental practice activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 8620 Description: Medical and dental practice activities Explanatory Note Inclusion: This class includes:\n- medical consultation and treatment in the field of general and specialized medicine by general practitioners and medical specialists and surgeons\n- dental practice activities of a general or specialized nature, e.g. dentistry, endodontic and pediatric dentistry; oral pathology \n- orthodontic activities\n- family planning centres providing medical treatment, such as sterilization and termination of pregnancy, without accommodation\nThese activities can be carried out in private practice, group practices and in hospital outpatient clinics, and in clinics such as those attached to firms, schools, homes for the aged, labour organizations and fraternal organizations, as well as in patients' homes.\n\nThis class also includes:\n- dental activities in operating rooms\n- private consultants' services to inpatients Explanatory Note Exclusion: This class excludes:\n- production of artificial teeth, denture and prosthetic appliances by dental laboratories, see 3250\n- inpatient hospital activities, see 8610\n- paramedical activities such as those of midwives, nurses and physiotherapists, see 8690",
	},
	{
		id: '92cc7014-3aaf-4926-ad31-80eeb2ada88d',
		name: '90:Creative, arts and entertainment activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 90 Description: Creative, arts and entertainment activities Explanatory Note Inclusion: See class 9000. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7ffd4d9c-353b-43b2-a757-86bfb03ddd07',
		name: '0240:Support services to forestry',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0240 Description: Support services to forestry Explanatory Note Inclusion: This class includes carrying out part of the forestry operation on a fee or contract basis.\n\nThis class includes:\n- forestry service activities:\n* forestry inventories\n* forest management consulting services\n* timber evaluation\n* forest fire fighting and protection\n* forest pest control\n- logging service activities:\n* transport of logs within the forest Explanatory Note Exclusion: This class excludes:\n- operation of forest tree nurseries, see 0210',
	},
	{
		id: '02d1bc8b-84fe-4a93-a761-645ad19c1685',
		name: '1101:Distilling, rectifying and blending of spirits',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1101 Description: Distilling, rectifying and blending of spirits Explanatory Note Inclusion: This class includes:\n- manufacture of distilled, potable, alcoholic beverages: whisky, brandy, gin, liqueurs, "mixed drinks" etc.\n- blending of distilled spirits\n- production of neutral spirits Explanatory Note Exclusion: This class excludes:\n- manufacture of ethyl alcohol, see 2011\n- manufacture of non-distilled alcoholic beverages, see 1102, 1103\n- merely bottling and labeling, see 4630 (if performed as part of wholesale) and 8292 (if performed on a fee or contract basis)',
	},
	{
		id: 'e3d141d2-952a-41da-8f06-ee878bfed090',
		name: '692:Accounting, bookkeeping and auditing activities; tax consultancy',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 692 Description: Accounting, bookkeeping and auditing activities; tax consultancy Explanatory Note Inclusion: See class 6920. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c4b89873-a66d-4882-b523-a613b9aacd88',
		name: '8110:Combined facilities support activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 8110 Description: Combined facilities support activities Explanatory Note Inclusion: This class includes:\n- provision of a combination of support services within a client's facility, such as general interior cleaning, maintenance, trash disposal, guard and security, mail routing, reception, laundry and related services to support operations within facilities\n\nUnits classified here provide operating staff to carry out these support activities, but are not involved with or responsible for the core business or activities of the client. Explanatory Note Exclusion: This class excludes:\n- provision of only one of the support services (e.g. general interior cleaning services) or addressing only a single function (e.g. heating), see the appropriate class according to the service provided\n- provision of management and operating staff for the complete operation of a client's establishment, such as a hotel, restaurant, mine, or hospital, see the class of the unit operated\n- provision of on site management and operation of a client's computer systems and/or data processing facilities, see 6202\n- operation of correctional facilities on a contract or fee basis, see 8423",
	},
	{
		id: 'df47c3af-5bbe-404f-a328-4c852ba8f9b7',
		name: '591:Motion picture, video and television programme activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 591 Description: Motion picture, video and television programme activities Explanatory Note Inclusion: This group includes production of theatrical and non-theatrical motion pictures whether on film, videotape, DVD or other media, including digital distribution, for direct projection in theatres or for broadcasting on television; supporting activities such as film editing, cutting, dubbing etc.; distribution of motion pictures or other film productions (video tapes, DVDs, etc) to other industries; as well as their projection. Buying and selling of motion picture or any other film production distribution rights is also included. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '3cfe2a2a-de46-41f4-a74d-4591b8c720c8',
		name: '0721:Mining of uranium and thorium ores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0721 Description: Mining of uranium and thorium ores Explanatory Note Inclusion: This class includes:\n- mining of ores chiefly valued for uranium and thorium content: pitchblende etc.\n- concentration of such ores\n- production of yellowcake Explanatory Note Exclusion: This class excludes:\n- enrichment of uranium and thorium ores, see 2011\n- production of uranium metal from pitchblende or other ores, see 2420\n- smelting and refining of uranium, see 2420',
	},
	{
		id: 'db303709-3eac-4c8b-9ed9-7e4888240c50',
		name: '3830:Materials recovery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3830 Description: Materials recovery Explanatory Note Inclusion: This class includes:\n- processing of metal and non-metal waste and scrap and other articles into secondary raw materials, usually involving a mechanical or chemical transformation process\n- recovery of materials from waste streams in the form of:\n* separating and sorting recoverable materials from non-hazardous waste streams (i.e. garbage)\n* separating and sorting of commingled recoverable materials, such as paper, plastics, used beverage cans and metals, into distinct categories\n\nExamples of the mechanical or chemical transformation processes that are undertaken are:\n- mechanical crushing of metal waste such as used cars, washing machines, bikes etc. with subsequent sorting and separation\n- dismantling of automobiles, computers, televisions and other equipment for materials recovery\n- mechanical reduction of large iron pieces such as railway wagons\n- shredding of metal waste, end-of-life vehicles etc.\n- other methods of mechanical treatment as cutting, pressing to reduce the volume\n- ship-breaking\n- reclaiming metals out of photographic waste, e.g. fixer solution or photographic films and paper \n- reclaiming of rubber such as used tires to produce secondary raw material\n- sorting and pelleting of plastics to produce secondary raw material for tubes, flower pots, pallets and the like\n- processing (cleaning, melting, grinding) of plastic or rubber waste to granulates\n- crushing, cleaning and sorting of glass\n- crushing, cleaning and sorting of other waste such as demolition waste to obtain secondary raw material\n- processing of used cooking oils and fats into secondary raw materials\n- processing of other food, beverage and tobacco waste and residual substances into secondary raw materials Explanatory Note Exclusion: This class excludes:\n- manufacture of new final products from (whether or not self-produced) secondary raw materials, such as spinning yarn from garnetted stock, making pulp from paper waste, retreading tyres or production of metal from metal scrap, see corresponding classes in section C (Manufacturing)\n- reprocessing of nuclear fuels, see 2011\n- remelting ferrous waste and scrap, see 2410\n- treatment and disposal of non-hazardous waste, see 3821\n- treatment of organic waste for disposal, see 3821\n- energy recovery from non-hazardous waste incineration processes, see 3821\n- disposal of used goods such as refrigerators to eliminate harmful waste, see 3822\n- treatment and disposal of transition radioactive waste from hospitals etc., see 3822\n- treatment and disposal of toxic, contaminated waste, see 3822\n- dismantling of automobiles, computers, televisions and other equipment to obtain and re-sell usable parts, see section G\n- wholesale of recoverable materials, see 4669',
	},
	{
		id: '26798f66-7a87-4d6e-8d34-1bd748c36ea6',
		name: '1075:Manufacture of prepared meals and dishes',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1075 Description: Manufacture of prepared meals and dishes Explanatory Note Inclusion: This class includes the manufacture of ready-made (i.e. prepared, seasoned and cooked) meals and dishes. These dishes are processed to preserve them, such as in frozen or canned form, and are usually packaged and labeled for re-sale, i.e. this class does not include the preparation of meals for immediate consumption, such as in restaurants. To be considered a dish, these foods have to contain at least two distinct main ingredients (except seasonings etc.).\n\nThis class includes:\n- manufacture of meat or poultry dishes\n- manufacture of fish dishes, including fish and chips\n- manufacture of prepared dishes of vegetables\n- manufacture of canned stews and vacuum-prepared meals\n- manufacture of other prepared meals (such as "TV dinners", etc.)\n- manufacture of frozen or otherwise preserved pizza Explanatory Note Exclusion: This class excludes:\n- manufacture of fresh foods or foods with only one main ingredient, see division 10\n- preparation of meals and dishes for immediate consumption, see division 56\n- activities of food service contractors, see 5629',
	},
	{
		id: 'af7394e6-c33c-4edf-aa0f-ffb068c3123b',
		name: '93:Sports activities and amusement and recreation activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 93 Description: Sports activities and amusement and recreation activities Explanatory Note Inclusion: This division includes the provision of recreational, amusement and sports activities (except museums activities, preservation of historical sites, botanical and zoological gardens and nature reserves activities; and gambling and betting activities).\n\nExcluded from this division are dramatic arts, music and other arts and entertainment such as the production of live theatrical presentations, concerts and opera or dance productions and other stage productions, see division 90. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd993cd6e-fa74-4867-9531-d24fb75d5089',
		name: '2720:Manufacture of batteries and accumulators',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2720 Description: Manufacture of batteries and accumulators Explanatory Note Inclusion: This class includes the manufacture of non-rechargeable and rechargeable batteries.\n\nThis class includes:\n- manufacture of primary cells and primary batteries \n* cells containing manganese dioxide, mercuric dioxide, silver oxide etc.\n- manufacture of electric accumulators, including parts thereof:\n* separators, containers, covers\n- manufacture of lead acid batteries\n- manufacture of NiCad batteries\n- manufacture of NiMH batteries\n- manufacture of lithium batteries\n- manufacture of dry cell batteries\n- manufacture of wet cell batteries Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '824f9706-54ba-4de0-9c4f-cfb73d276fef',
		name: '86:Human health activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 86 Description: Human health activities Explanatory Note Inclusion: This division includes activities of short- or long-term hospitals, general or specialty medical, surgical, psychiatric and substance abuse hospitals, sanatoria, preventoria, medical nursing homes, asylums, mental hospital institutions, rehabilitation centres, leprosaria and other human health institutions which have accommodation facilities and which engage in providing diagnostic and medical treatment to inpatients with any of a wide variety of medical conditions. It also includes medical consultation and treatment in the field of general and specialized medicine by general practitioners and medical specialists and surgeons. It includes dental practice activities of a general or specialized nature and orthodontic activities. Additionally, this division includes activities for human health not performed by hospitals or by practicing medical doctors but by paramedical practitioners legally recognized to treat patients. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2c252d7e-6777-473b-8c2e-2ce134a4dd86',
		name: '990:Activities of extraterritorial organizations and bodies',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 990 Description: Activities of extraterritorial organizations and bodies Explanatory Note Inclusion: See class 9900. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b6f6db54-c780-40c5-be41-a88150bf90e7',
		name: '8030:Investigation activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8030 Description: Investigation activities Explanatory Note Inclusion: This class includes:\n- investigation and detective service activities\n- activities of all private investigators, independent of the type of client or purpose of investigation Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2fbefa76-b10b-4120-9966-682ad1b66329',
		name: '0163:Post-harvest crop activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0163 Description: Post-harvest crop activities Explanatory Note Inclusion: This class includes:\n- preparation of crops for primary markets, i.e. cleaning, trimming, grading, disinfecting \n- cotton ginning\n- preparation of tobacco leaves\n- preparation of cocoa beans\n- waxing of fruit\n- sun-drying of fruit and vegetables Explanatory Note Exclusion: This class excludes:\n- preparation of agricultural products by the producer, see groups 011 and 012\n- preserving of fruit and vegetables, including dehydration by artificial means, see 1030\n- stemming and redrying of tobacco, see 1200\n- marketing activities of commission merchants and cooperative associations, see division 46\n- wholesale of agricultural raw materials, see 4620',
	},
	{
		id: 'be33dec4-b7b7-40c4-9807-2d0548ec99fb',
		name: '182:Reproduction of recorded media',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 182 Description: Reproduction of recorded media Explanatory Note Inclusion: See class 1820. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4bd0eb89-4249-46fb-bc74-db848847ee4e',
		name: '9523:Repair of footwear and leather goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9523 Description: Repair of footwear and leather goods Explanatory Note Inclusion: This class includes:\n- repair and maintenance of footwear:\n* shoes, boots etc.\n- fitting of heels\n- repair and maintenance of leather goods:\n* luggage and the like Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8e362c26-87da-498d-bce4-645faff8979d',
		name: '7020:Management consultancy activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7020 Description: Management consultancy activities Explanatory Note Inclusion: This class includes the provision of advice, guidance and operational assistance to businesses and other organizations on management issues, such as strategic and organizational planning; decision areas that are financial in nature; marketing objectives and policies; human resource policies, practices and planning; production scheduling and control planning.\n\nThis provision of business services may include advice, guidance or operational assistance to businesses and the public service regarding:\n- public relations and communication \n- lobbying activities\n- design of accounting methods or procedures, cost accounting programmes, budgetary control procedures\n- advice and help to businesses and public services in planning, organization, efficiency and control, management information etc. Explanatory Note Exclusion: This class excludes:\n- design of computer software for accounting systems, see 6201\n- legal advice and representation, see 6910\n- accounting, bookkeeping and auditing activities, tax consulting, see 6920\n- architectural, engineering and other technical advisory activities, see 7110, 7490\n- advertising activities, see 7310\n- market research and public opinion polling, see 7320\n- executive placement or search consulting services, see 7810\n- educational consulting activities, see 8550',
	},
	{
		id: '7f668b02-5461-48bd-ae18-dfec04cce529',
		name: '4100:Construction of buildings',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4100 Description: Construction of buildings Explanatory Note Inclusion: This class includes the construction of complete residential or non-residential buildings, on own account for sale or on a fee or contract basis. Outsourcing parts or even the whole construction process is possible. If only specialized parts of the construction process are carried out, the activity is classified in division 43.\n\nThis class includes:\n- construction of all types of residential buildings:\n* single-family houses\n* multi-family buildings, including high-rise buildings\n- construction of all types of non-residential buildings:\n* buildings for industrial production, e.g. factories, workshops, assembly plants etc.\n* hospitals, schools, office buildings\n* hotels, stores, shopping malls, restaurants\n* airport buildings\n* indoor sports facilities\n* parking garages, including underground parking garages\n* warehouses\n* religious buildings\n- assembly and erection of prefabricated constructions on the site\n\nThis class also includes:\n- remodeling or renovating existing residential structures Explanatory Note Exclusion: This class excludes:\n- erection of complete prefabricated constructions from self-manufactured parts not of concrete, see divisions 16 and 25\n- construction of industrial facilities, except buildings, see 4290\n- architectural and engineering activities, see 7110\n- project management activities related to construction, see 7110',
	},
	{
		id: '8f4689ed-c3b8-436e-bb91-364624d93144',
		name: '0116:Growing of fibre crops',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0116 Description: Growing of fibre crops Explanatory Note Inclusion: This class includes:\n- growing of cotton\n- growing of jute, kenaf and other textile bast fibres\n- growing of flax and true hemp\n- growing of sisal and other textile fibre of the genus agave\n- growing of abaca, ramie and other vegetable textile fibres\n- growing of other fibre crops Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7c846b34-e322-4c7b-9c3b-1a45e1127b67',
		name: '8790:Other residential care activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 8790 Description: Other residential care activities Explanatory Note Inclusion: This class includes the provision of residential and personal care services for persons, except the elderly and disabled, who are unable to fully care for themselves or who do not desire to live independently.\n\nThis class includes:\n- activities provided on a round-the-clock basis directed to provide social assistance to children and special categories of persons with some limits on ability for self-care, but where medical treatment or education are not important elements:\n* orphanages\n* children's boarding homes and hostels\n* temporary homeless shelters\n* institutions that take care of unmarried mothers and their children\nThe activities may be carried out by public or private organizations.\n\nThis class also includes:\n- activities of:\n* halfway group homes for persons with social or personal problems\n* halfway homes for delinquents and offenders\n* disciplinary camps Explanatory Note Exclusion: This class excludes:\n- funding and administration of compulsory social security programmes, see 8430\n- activities of nursing care facilities, see 8710\n- residential care activities for mental retardation, mental health and substance abuse, see 8720\n- residential care activities for the elderly or disabled, see 8730\n- adoption activities, see 8890\n- short-term shelter activities for disaster victims, see 8890",
	},
	{
		id: '2fefc5a8-9c56-48be-a5f9-7c94d028dab4',
		name: '9321:Activities of amusement parks and theme parks',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9321 Description: Activities of amusement parks and theme parks Explanatory Note Inclusion: This class includes:\n- activities of amusement parks or theme parks, including the operation of a variety of attractions, such as mechanical rides, water rides, games, shows, theme exhibits and picnic grounds Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7e518b16-b9ad-407d-87b4-4e74f817b6ad',
		name: '8542:Cultural education',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8542 Description: Cultural education Explanatory Note Inclusion: This class includes provision of instruction in the arts, drama and music. Units giving this type of instructions might be named "schools", "studios", "classes" etc. They provide formally organized instruction, mainly for hobby, recreational or self-development purposes, but such instruction does not lead to a professional diploma, baccalaureate or graduate degree.\n\nThis class includes:\n- piano teachers and other music instruction\n- art instruction\n- dance instruction and dance studios\n- drama schools (except academic)\n- fine arts schools (except academic)\n- performing arts schools (except academic)\n- photography schools (except commercial) Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8714dc59-0b7b-4e7a-8227-e639051eb6e1',
		name: '202:Manufacture of other chemical products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 202 Description: Manufacture of other chemical products Explanatory Note Inclusion: This group includes the manufacture of chemical products other than basic chemicals and man-made fibres. This includes the manufacture of a variety of goods such as pesticides, paints and inks, soap, cleaning preparations, perfumes and toilet preparations, explosives and pyrotechnic products, chemical preparations for photographic uses (including film and sensitized paper), gelatins, composite diagnostic preparations etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd06fa13b-9556-4b82-98e8-6d57cae7bc82',
		name: '6612:Security and commodity contracts brokerage',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6612 Description: Security and commodity contracts brokerage Explanatory Note Inclusion: This class includes:\n- dealing in financial markets on behalf of others (e.g. stock broking) and related activities\n- securities brokerage\n- commodity contracts brokerage \n- activities of bureaux de change etc. Explanatory Note Exclusion: This class excludes:\n- dealing in markets on own account, see 6499\n- portfolio management, on a fee or contract basis, see 6630',
	},
	{
		id: '4f0398fe-506c-443d-ac87-b441d11fa122',
		name: '1621:Manufacture of veneer sheets and wood-based panels',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1621 Description: Manufacture of veneer sheets and wood-based panels Explanatory Note Inclusion: This class includes:\n- manufacture of veneer sheets thin enough to be used for veneering, making plywood or other purposes:\n* smoothed, dyed, coated, impregnated, reinforced (with paper or fabric backing)\n* made in the form of motifs\n- manufacture of plywood, veneer panels and similar laminated wood boards and sheets\n- manufacture of particle board and fibreboard\n- manufacture of densified wood\n- manufacture of glue laminated wood, laminated veneer wood Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd455ec1e-cff4-42d2-b40b-1c19e0b53c74',
		name: '6499:Other financial service activities, except insurance and pension funding ac',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6499 Description: Other financial service activities, except insurance and pension funding activities, n.e.c. Explanatory Note Inclusion: This class includes:\n- other financial service activities primarily concerned with distributing funds other than by making loans:\n* factoring activities\n* writing of swaps, options and other hedging arrangements\n* activities of viatical settlement companies\n- own-account investment activities, such as by venture capital companies, investment clubs etc. Explanatory Note Exclusion: This class excludes:\n- financial leasing, see 6491\n- security dealing on behalf of others, see 6612\n- trade, leasing and renting of real estate property, see division 68\n- bill collection without debt buying up, see 8291\n- grant-giving activities by membership organizations, see 9499',
	},
	{
		id: 'e80c5043-55d7-4b7f-b49e-6460a14ad62f',
		name: '3212:Manufacture of imitation jewellery and related articles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3212 Description: Manufacture of imitation jewellery and related articles Explanatory Note Inclusion: This class includes:\n- manufacture of costume or imitation jewellery:\n* rings, bracelets, necklaces, and similar articles of jewellery made from base metals plated with precious metals\n* jewellery containing imitation stones such as imitation gems stones, imitation diamonds, and similar\n- manufacture of metal watch bands (except precious metal) Explanatory Note Exclusion: This class excludes:\n- manufacture of jewellery made from precious metals or clad with precious metals, see 3211\n- manufacture of jewellery containing genuine gem stones, see 3211\n- manufacture of precious metal watch bands, see 3211',
	},
	{
		id: 'b771299d-8abd-40c5-aedf-9f8dff2a9275',
		name: '8411:General public administration activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8411 Description: General public administration activities Explanatory Note Inclusion: This class includes:\n- executive and legislative administration of central, regional and local bodies\n- administration and supervision of fiscal affairs:\n* operation of taxation schemes\n* duty/tax collection on goods and tax violation investigation\n* customs administration\n- budget implementation and management of public funds and public debt:\n* raising and receiving of moneys and control of their disbursement\n- administration of overall (civil) R&D policy and associated funds\n- administration and operation of overall economic and social planning and statistical services at the various levels of government Explanatory Note Exclusion: This class excludes:\n- operation of government owned or occupied buildings, see 6810, 6820\n- administration of R&D policies intended to increase personal well-being and of associated funds, see 8412\n- administration of R&D policies intended to improve economic performance and competitiveness, see 8413\n- administration of defence-related R&D policies and of associated funds, see 8422\n- operation of government archives, see 9101',
	},
	{
		id: '8d28589c-e03a-463e-8cad-74c053cb299f',
		name: '5012:Sea and coastal freight water transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5012 Description: Sea and coastal freight water transport Explanatory Note Inclusion: This class includes:\n- transport of freight over seas and coastal waters, whether scheduled or not\n- transport by towing or pushing of barges, oil rigs etc. Explanatory Note Exclusion: This class excludes:\n- storage of freight, see 5210\n- harbour operation and other auxiliary activities such as docking, pilotage, lighterage, vessel salvage, see 5222\n- cargo handling, see 5224',
	},
	{
		id: '319643e5-c324-4efc-872f-c7db5ecdfabf',
		name: '6629:Other activities auxiliary to insurance and pension funding',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6629 Description: Other activities auxiliary to insurance and pension funding Explanatory Note Inclusion: This class includes:\n- activities involved in or closely related to insurance and pension funding (except claims adjusting and activities of insurance agents):\n* salvage administration\n* actuarial services Explanatory Note Exclusion: This class excludes:\n- marine salvage activities, see 5222',
	},
	{
		id: '6fe7bc2b-4be4-48f7-92b0-f27dea9053ce',
		name: '2420:Manufacture of basic precious and other non-ferrous metals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2420 Description: Manufacture of basic precious and other non-ferrous metals Explanatory Note Inclusion: This class includes:\n- production of basic precious metals:\n* production and refining of unwrought or wrought precious metals: gold, silver, platinum etc. from ore and scrap\n- production of precious metal alloys\n- production of precious metal semi-products\n- production of silver rolled onto base metals\n- production of gold rolled onto base metals or silver\n- production of platinum and platinum group metals rolled onto gold, silver or base metals\n- production of aluminium from alumina\n- production of aluminium from electrolytic refining of aluminium waste and scrap\n- production of aluminium alloys\n- semi-manufacturing of aluminium\n- production of lead, zinc and tin from ores\n- production of lead, zinc and tin from electrolytic refining of lead, zinc and tin waste and scrap\n- production of lead, zinc and tin alloys\n- semi-manufacturing of lead, zinc and tin\n- production of copper from ores\n- production of copper from electrolytic refining of copper waste and scrap\n- production of copper alloys\n- manufacture of fuse wire or strip\n- semi-manufacturing of copper\n- production of chrome, manganese, nickel etc. from ores or oxides\n- production of chrome, manganese, nickel etc. from electrolytic and aluminothermic refining of chrome, manganese, nickel etc., waste and scrap\n- production of alloys of chrome, manganese, nickel etc. \n- semi-manufacturing of chrome, manganese, nickel etc.\n- production of mattes of nickel\n- production of uranium metal from pitchblende or other ores\n- smelting and refining of uranium\n\nThis class also includes:\n- manufacture of wire of these metals by drawing\n- production of aluminium oxide (alumina)\n- production of aluminium wrapping foil\n- manufacture of aluminium (tin) foil laminates made from aluminum (tin) foil as primary component\n- manufacture of precious metal foil laminates Explanatory Note Exclusion: This class excludes:\n- casting of non-ferrous metals, see 2432\n- manufacture of precious metal jewellery, see 3211',
	},
	{
		id: 'd45058a5-04c6-40c3-9fb8-40c7e8f43fdd',
		name: '2393:Manufacture of other porcelain and ceramic products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2393 Description: Manufacture of other porcelain and ceramic products Explanatory Note Inclusion: This class includes:\n- manufacture of ceramic tableware and other domestic or toilet articles\n- manufacture of statuettes and other ornamental ceramic articles\n- manufacture of electrical insulators and insulating fittings of ceramics\n- manufacture of ceramic and ferrite magnets\n- manufacture of ceramic laboratory, chemical and industrial products\n- manufacture of ceramic pots, jars and similar articles of a kind used for conveyance or packing of goods\n- manufacture of ceramic furniture\n- manufacture of ceramic products n.e.c. Explanatory Note Exclusion: This class excludes:\n- manufacture of artificial stone (e.g. cultured marble), see 2220\n- manufacture of refractory ceramic goods, see 2391\n- manufacture of ceramic building materials, see 2392\n- manufacture of ceramic sanitary fixtures, see 2392\n- manufacture of permanent metallic magnets, see 2599\n- manufacture of imitation jewellery, see 3212\n- manufacture of ceramic toys, see 3240\n- manufacture of artificial teeth, see 3250',
	},
	{
		id: '2cce0a11-fb4e-4b04-bb76-91b454b2f781',
		name: '262:Manufacture of computers and peripheral equipment',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 262 Description: Manufacture of computers and peripheral equipment Explanatory Note Inclusion: See class 2620. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '086fb958-e752-4ea8-b403-4edda1a862b5',
		name: '301:Building of ships and boats',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 301 Description: Building of ships and boats Explanatory Note Inclusion: This group includes the building of ships, boats and other floating structures for transportation and other commercial purposes, as well as for sports and recreational purposes. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '01c902be-ebb1-4276-b143-71bd571df784',
		name: '803:Investigation activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 803 Description: Investigation activities Explanatory Note Inclusion: See class 8030. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f8944dcb-01b2-430b-8ff1-6c5960044ff2',
		name: '78:Employment activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 78 Description: Employment activities Explanatory Note Inclusion: This division includes activities of listing employment vacancies and referring or placing applicants for employment, where the individuals referred or placed are not employees of the employment agencies, supplying workers to clients' businesses for limited periods of time to supplement the working force of the client, and the activities of providing human resources and human resource management services for others on a contract or fee basis. This division also includes executive search and placement activities and activities of theatrical casting agencies.\n\nThis division excludes the activities of agents for individual artists (see class 7490). Explanatory Note Exclusion: [Empty]",
	},
	{
		id: 'ae94b54e-3d5e-4eb3-8c07-449b50bd1cee',
		name: '06:Extraction of crude petroleum and natural gas',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 06 Description: Extraction of crude petroleum and natural gas Explanatory Note Inclusion: This division includes the production of crude petroleum, the mining and extraction of oil from oil shale and oil sands and the production of natural gas and recovery of hydrocarbon liquids. This includes the overall activities of operating and/or developing oil and gas field properties, including such activities as drilling, completing and equipping wells, operating separators, emulsion breakers, desilting equipment and field gathering lines for crude petroleum and all other activities in the preparation of oil and gas up to the point of shipment from the producing property.\n\nThis division excludes support activities for petroleum and gas extraction, such as oil and gas field services, performed on a fee or contract basis, oil and gas well exploration and test drilling and boring activities (see class 0910). This division also excludes the refining of petroleum products (see class 1920) and geophysical, geologic and seismic surveying activities (see class 7110). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '49854a36-ed8d-4a9b-b16f-33ec6a332f6e',
		name: '6512:Non-life insurance',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6512 Description: Non-life insurance Explanatory Note Inclusion: This class includes:\n- provision of insurance services other than life insurance:\n* accident and fire insurance\n* health insurance\n* travel insurance\n* property insurance\n* motor, marine, aviation and transport insurance\n* pecuniary loss and liability insurance Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '00ee7628-01fb-448c-8141-5a7d0c258c14',
		name: '1709:Manufacture of other articles of paper and paperboard',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1709 Description: Manufacture of other articles of paper and paperboard Explanatory Note Inclusion: This class includes:\n- manufacture of household and personal hygiene paper and cellulose wadding products:\n* cleansing tissues\n* handkerchiefs, towels, serviettes\n* toilet paper\n* sanitary towels and tampons, napkins and napkin liners for babies\n* cups, dishes and trays\n- manufacture of textile wadding and articles of wadding: sanitary towels, tampons etc.\n- manufacture of printing and writing paper ready for use\n- manufacture of computer printout paper ready for use\n- manufacture of self-copy paper ready for use\n- manufacture of duplicator stencils and carbon paper ready for use\n- manufacture of gummed or adhesive paper ready for use\n- manufacture of envelopes and letter-cards\n- manufacture of registers, accounting books, binders, albums and similar educational and commercial stationery\n- manufacture of boxes, pouches, wallets and writing compendiums containing an assortment of paper stationery\n- manufacture of wallpaper and similar wall coverings, including vinyl-coated and textile wallpaper\n- manufacture of labels\n- manufacture of filter paper and paperboard\n- manufacture of paper and paperboard bobbins, spools, cops etc.\n- manufacture of egg trays and other moulded pulp packaging products etc.\n- manufacture of paper novelties Explanatory Note Exclusion: This class excludes:\n- manufacture of paper or paperboard in bulk, see 1701\n- printing on paper products, see 1811\n- manufacture of playing cards, see 3240\n- manufacture of games and toys of paper or paperboard, see 3240',
	},
	{
		id: 'feaaefac-8bd3-4ae2-b7b5-8a1304aea2dc',
		name: '152:Manufacture of footwear',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 152 Description: Manufacture of footwear Explanatory Note Inclusion: See class 1520. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f862ad6e-fec4-4f05-a720-21eca74740da',
		name: '6491:Financial leasing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6491 Description: Financial leasing Explanatory Note Inclusion: This class includes:\n- leasing where the term approximately covers the expected life of the asset and the lessee acquires substantially all the benefits of its use and takes all the risks associated with its ownership. The ownership of the asset may or may not eventually be transferred. Such leases cover all or virtually all costs including interest. Explanatory Note Exclusion: This class excludes:\n- operational leasing, see division 77, according to type of goods leased',
	},
	{
		id: '3875da25-c59b-4679-8c6e-54c779fca233',
		name: '9000:Creative, arts and entertainment activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9000 Description: Creative, arts and entertainment activities Explanatory Note Inclusion: This class includes the operation of facilities and provision of services to meet the cultural and entertainment interests of their customers. This includes the production and promotion of, and participation in, live performances, events or exhibits intended for public viewing; the provision of artistic, creative or technical skills for the production of artistic products and live performances.\n\nThis class includes:\n- production of live theatrical presentations, concerts and opera or dance productions and other stage productions:\n* activities of groups, circuses or companies, orchestras or bands\n* activities of individual artists such as authors, actors, directors, musicians, lecturers or speakers, stage-set designers and builders etc.\n- operation of concert and theatre halls and other arts facilities\n- activities of sculptors, painters, cartoonists, engravers, etchers etc.\n- activities of individual writers, for all subjects including fictional writing, technical writing etc.\n- activities of independent journalists\n- restoring of works of art such as paintings etc.\n\nThis class also includes:\n- activities of producers or entrepreneurs of arts live events, with or without facilities Explanatory Note Exclusion: This class excludes:\n- restoring of stained glass windows, see 2310\n- manufacture of statues, other than artistic originals, see 2396\n- restoring of organs and other historical musical instruments, see 3319\n- restoring of historical sites and buildings, see 4100\n- motion picture and video production, see 5911, 5912\n- operation of cinemas, see 5914\n- activities of personal theatrical or artistic agents or agencies, see 7490\n- casting activities, see 7810\n- activities of ticket agencies, see 7990\n- operation of museums of all kinds, see 9102\n- sports and amusement and recreation activities, see division 93\n- restoring of furniture (except museum type restoration), see 9524',
	},
	{
		id: 'df64fcaf-ff24-489d-bb3b-4decdd04df29',
		name: '9603:Funeral and related activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 9603 Description: Funeral and related activities Explanatory Note Inclusion: This class includes:\n- burial and incineration of human or animal corpses and related activities:\n* preparing the dead for burial or cremation and embalming and morticians' services\n* providing burial or cremation services\n* rental of equipped space in funeral parlours\n- rental or sale of graves\n- maintenance of graves and mausoleums Explanatory Note Exclusion: This class excludes:\n- religious funeral service activities, see 9491",
	},
	{
		id: '9bbedca5-97b5-44a9-a346-cbab74bf613e',
		name: '3230:Manufacture of sports goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3230 Description: Manufacture of sports goods Explanatory Note Inclusion: This class includes the manufacture of sporting and athletic goods (except apparel and footwear).\n\nThis class includes:\n- manufacture of articles and equipment for sports, outdoor and indoor games, of any material:\n* hard, soft and inflatable balls\n* rackets, bats and clubs\n* skis, bindings and poles\n* ski-boots\n* sailboards and surfboards\n* requisites for sport fishing, including landing nets\n* requisites for hunting, mountain climbing etc.\n* leather sports gloves and sports headgear\n* ice skates, roller skates etc.\n* bows and crossbows\n* gymnasium, fitness centre or athletic equipment Explanatory Note Exclusion: This class excludes:\n- manufacture of boat sails, see 1392\n- manufacture of sports apparel, see 1410\n- manufacture of saddlery and harness, see 1512\n- manufacture of whips and riding crops, see 1512\n- manufacture of sports footwear, see 1520\n- manufacture of sporting weapons and ammunition, see 2520\n- manufacture of metal weights as used for weightlifting, see 2599\n- manufacture of automatic bowling alley equipment (e.g. pin-setters), see 2829\n- manufacture of sports vehicles other than toboggans and the like, see divisions 29 and 30\n- manufacture of boats, see 3012\n- manufacture of billiard tables, see 3240\n- manufacture of ear and noise plugs (e.g. for swimming and noise protection), see 3290',
	},
	{
		id: 'fe059bf0-4191-47b6-91c3-3e734bda99ef',
		name: '2733:Manufacture of wiring devices',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2733 Description: Manufacture of wiring devices Explanatory Note Inclusion: This class includes the manufacture of current-carrying and non current-carrying wiring devices for electrical circuits regardless of material.\n\nThis class includes:\n- manufacture of bus bars, electrical conductors (except switchgear-type) \n- manufacture of GFCI (ground fault circuit interrupters) \n- manufacture of lamp holders \n- manufacture of lightning arrestors and coils\n- manufacture of switches for electrical wiring (e.g. pressure, pushbutton, snap, tumbler switches) \n- manufacture of electrical outlets and sockets\n- manufacture of boxes for electrical wiring (e.g. junction, outlet, switch boxes) \n- manufacture of electrical conduit and fitting\n- manufacture of transmission pole and line hardware\n- manufacture of plastic non current-carrying wiring devices including plastic junction boxes, face plates, and similar, plastic pole line fittings Explanatory Note Exclusion: This class excludes:\n- manufacture of ceramic insulators, see 2393\n- manufacture of electronic component-type connectors, sockets and switches, see 2610',
	},
	{
		id: '14181512-75f0-4c44-8bea-6245e2f21484',
		name: '1313:Finishing of textiles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1313 Description: Finishing of textiles Explanatory Note Inclusion: This class includes:\n- bleaching and dyeing of textile fibres, yarns, fabrics and textile articles, including wearing apparel\n- dressing, drying, steaming, shrinking, mending, Sanforizing, mercerizing of textiles and textile articles, including wearing apparel\n\nThis class also includes:\n- bleaching of jeans\n- pleating and similar work on textiles\n- waterproofing, coating, rubberizing or impregnating of garments \n- silk-screen printing on textiles and wearing apparel Explanatory Note Exclusion: This class excludes:\n- manufacture of textile fabric impregnated, coated, covered or laminated with rubber, where rubber is the chief constituent, see 2219',
	},
	{
		id: '2e975fde-e7b9-4bb3-b116-fa2adbfe95de',
		name: '268:Manufacture of magnetic and optical media',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 268 Description: Manufacture of magnetic and optical media Explanatory Note Inclusion: See class 2680. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c9135e5a-99c5-454f-9fb9-b385422ddb3e',
		name: '56:Food and beverage service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 56 Description: Food and beverage service activities Explanatory Note Inclusion: This division includes food and beverage serving activities providing complete meals or drinks fit for immediate consumption, whether in traditional restaurants, self-service or take-away restaurants, whether as permanent or temporary stands with or without seating. Decisive is the fact that meals fit for immediate consumption are offered, not the kind of facility providing them.\n\nExcluded is the production of meals not fit for immediate consumption or not planned to be consumed immediately or of prepared food which is not considered to be a meal (see divisions 10: Manufacture of food products and 11: Manufacture of beverages). Also excluded is the sale of not self-manufactured food that is not considered to be a meal or of meals that are not fit for immediate consumption (see section G: Wholesale and retail trade; ...). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7d8797bc-b6f2-49ca-9531-6bee9043f3af',
		name: '532:Courier activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 532 Description: Courier activities Explanatory Note Inclusion: See class 5320. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '18596192-7a25-4bcf-9baf-8548ebf56994',
		name: '275:Manufacture of domestic appliances',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 275 Description: Manufacture of domestic appliances Explanatory Note Inclusion: See class 2750. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f03d1422-c585-4189-a0d9-40b9015d9631',
		name: '2818:Manufacture of power-driven hand tools',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2818 Description: Manufacture of power-driven hand tools Explanatory Note Inclusion: This class includes:\n- manufacture of hand tools, with self-contained electric or non-electric motor or pneumatic drive, such as:\n* circular or reciprocating saws\n* drills and hammer drills\n* hand held power sanders\n* pneumatic nailers\n* buffers\n* routers\n* grinders\n* staplers\n* pneumatic rivet guns\n* planers\n* shears and nibblers\n* impact wrenches\n* powder actuated nailers Explanatory Note Exclusion: This class excludes:\n- manufacture of electrical hand-held soldering and welding equipment, see 2790',
	},
	{
		id: '7a6e7c2b-91ec-4e6e-8286-774ee80457bd',
		name: '024:Support services to forestry',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 024 Description: Support services to forestry Explanatory Note Inclusion: See class 0240. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '1569ef79-3c08-4e08-b908-a839ed48976c',
		name: '0810:Quarrying of stone, sand and clay',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0810 Description: Quarrying of stone, sand and clay Explanatory Note Inclusion: This class includes:\n- quarrying, rough trimming and sawing of monumental and building stone such as marble, granite, sandstone etc.\n- quarrying, crushing and breaking of limestone\n- mining of gypsum and anhydrite\n- mining of chalk and uncalcined dolomite\n- extraction and dredging of industrial sand, sand for construction and gravel\n- breaking and crushing of stone and gravel \n- quarrying of sand\n- mining of clays, refractory clays and kaolin Explanatory Note Exclusion: This class excludes:\n- mining of bituminous sand, see 0610\n- mining of chemical and fertilizer minerals, see 0891\n- production of calcined dolomite, see 2394\n- cutting, shaping and finishing of stone outside quarries, see 2396',
	},
	{
		id: 'e6605309-0b0a-4137-b155-b1bb3d06be83',
		name: '4630:Wholesale of food, beverages and tobacco',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4630 Description: Wholesale of food, beverages and tobacco Explanatory Note Inclusion: This class includes:\n- wholesale of fruit and vegetables\n- wholesale of dairy products\n- wholesale of eggs and egg products\n- wholesale of edible oils and fats of animal or vegetable origin\n- wholesale of meat and meat products\n- wholesale of fishery products\n- wholesale of sugar, chocolate and sugar confectionery\n- wholesale of bakery products\n- wholesale of beverages\n- wholesale of coffee, tea, cocoa and spices\n- wholesale of tobacco products\n\nThis class also includes:\n- buying of wine in bulk and bottling without transformation\n- wholesale of feed for pet animals Explanatory Note Exclusion: This class excludes:\n- blending of wine or distilled spirits, see 1101, 1102',
	},
	{
		id: '7c93938f-b364-4492-b26d-bb75fcab4c45',
		name: '6622:Activities of insurance agents and brokers',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6622 Description: Activities of insurance agents and brokers Explanatory Note Inclusion: This class includes:\n- activities of insurance agents and brokers (insurance intermediaries) in selling, negotiating or soliciting of annuities and insurance and reinsurance policies Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f6091b20-3424-49b7-b092-4e780a2d541c',
		name: '932:Other amusement and recreation activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 932 Description: Other amusement and recreation activities Explanatory Note Inclusion: This group includes the activities of a wide range of units that operate facilities or provide services to meet the varied recreational interests of their patrons, including the operation of a variety of attractions, such as mechanical rides, water rides, games, shows, theme exhibits and picnic grounds. Explanatory Note Exclusion: This group excludes:\n- sports activities, see group 931\n- dramatic arts, music and other arts and entertainment activities, see 9000',
	},
	{
		id: '7bdef184-1440-4dff-9f22-20e05edf02f7',
		name: '841:Administration of the State and the economic and social policy of the commun',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 841 Description: Administration of the State and the economic and social policy of the community Explanatory Note Inclusion: This group includes general administration (e.g. executive, legislative, financial administration etc. at all levels of government) and supervision in the field of social and economic life. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f7269711-1372-4f03-ba1f-edc5366839ee',
		name: '3091:Manufacture of motorcycles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3091 Description: Manufacture of motorcycles Explanatory Note Inclusion: This class includes:\n- manufacture of motorcycles, mopeds and cycles fitted with an auxiliary engine\n- manufacture of engines for motorcycles\n- manufacture of sidecars\n- manufacture of parts and accessories for motorcycles Explanatory Note Exclusion: This class excludes:\n- manufacture of bicycles, see 3092\n- manufacture of invalid carriages, see 3092',
	},
	{
		id: '7d017d7d-6cd3-4d09-804b-d095963eaddf',
		name: '960:Other personal service activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 960 Description: Other personal service activities Explanatory Note Inclusion: See division 96. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5eec83d3-66c2-4894-a8d2-a35a3585342d',
		name: '151:Tanning and dressing of leather; manufacture of luggage, handbags, saddlery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 151 Description: Tanning and dressing of leather; manufacture of luggage, handbags, saddlery and harness; dressing and dyeing of fur Explanatory Note Inclusion: This group includes the manufacture of leather and fur and products thereof. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '26238bbe-9301-4a0b-b795-9da3ed788ba8',
		name: '6511:Life insurance',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6511 Description: Life insurance Explanatory Note Inclusion: This class includes:\n- underwriting annuities and life insurance policies, disability income insurance policies, and accidental death and dismemberment insurance policies (with or without a substantial savings element). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '30e36ded-b8a3-4eb1-b5f5-edbe571c8c29',
		name: '0220:Logging',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0220 Description: Logging Explanatory Note Inclusion: This class includes:\n- production of roundwood for forest-based manufacturing industries\n- production of roundwood used in an unprocessed form such as pit-props, fence posts and utility poles\n- gathering and production of fire wood\n- production of charcoal in the forest (using traditional methods)\n\nThe output of this activity can take the form of logs, chips or fire wood. Explanatory Note Exclusion: This class excludes:\n- growing of Christmas trees, see 0129\n- growing of standing timber: planting, replanting, transplanting, thinning and conserving of forests and timber tracts, see 0210\n- gathering of wild growing non-wood forest products, see 0230\n- production of wood chips and particles, not associated with logging, see 1610\n- production of charcoal through distillation of wood, see 2011',
	},
	{
		id: 'e0d99251-70c4-4fce-af31-5f87773b725c',
		name: '461:Wholesale on a fee or contract basis',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 461 Description: Wholesale on a fee or contract basis Explanatory Note Inclusion: See class 4610. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9442f4ac-8972-4c3a-b906-4f45a875a62e',
		name: '802:Security systems service activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 802 Description: Security systems service activities Explanatory Note Inclusion: See class 8020. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '04b5300e-0ac0-4711-9810-b52d3f2830f6',
		name: '2732:Manufacture of other electronic and electric wires and cables',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2732 Description: Manufacture of other electronic and electric wires and cables Explanatory Note Inclusion: This class includes:\n- manufacture of insulated wire and cable, made of steel, copper, aluminium Explanatory Note Exclusion: This class excludes:\n- manufacture (drawing) of wire, see 2410, 2420\n- manufacture of computer cables, printer cables, USB cables and similar cable sets or assemblies, see 2610\n- manufacture of extension cords, see 2790\n- manufacture of cable sets, wiring harnesses and similar cable sets or assemblies for automotive applications, see 2930',
	},
	{
		id: '6b9cebae-0286-4343-b93b-01a84e0246d7',
		name: '2819:Manufacture of other general-purpose machinery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 2819 Description: Manufacture of other general-purpose machinery Explanatory Note Inclusion: This class includes:\n- manufacture of industrial refrigerating or freezing equipment, including assemblies of major components\n- manufacture of air-conditioning machines, including for motor vehicles\n- manufacture of non-domestic fans\n- manufacture of weighing machinery (other than sensitive laboratory balances):\n* household and shop scales, platform scales, scales for continuous weighing, weighbridges, weights etc.\n- manufacture of filtering or purifying machinery and apparatus for liquids\n- manufacture of equipment for projecting, dispersing or spraying liquids or powders:\n* spray guns, fire extinguishers, sandblasting machines, steam cleaning machines etc.\n- manufacture of packing and wrapping machinery:\n* filling, closing, sealing, capsuling or labeling machines etc.\n- manufacture of machinery for cleaning or drying bottles and for aerating beverages\n- manufacture of distilling or rectifying plant for petroleum refineries, chemical industries, beverage industries etc.\n- manufacture of heat exchangers\n- manufacture of machinery for liquefying air or gas\n- manufacture of gas generators\n- manufacture of calendering or other rolling machines and cylinders thereof (except for metal and glass)\n- manufacture of centrifuges (except cream separators and clothes dryers)\n- manufacture of gaskets and similar joints made of a combination of materials or layers of the same material\n- manufacture of automatic goods vending machines\n- manufacture of parts for general-purpose machinery\n- manufacture of attic ventilation fans (gable fans, roof ventilators, etc.)\n- manufacture of levels, tape measures and similar hand tools, machinists' precision tools (except optical)\n- manufacture of non-electrical welding and soldering equipment Explanatory Note Exclusion: This class excludes:\n- manufacture of sensitive (laboratory-type) balances, see 2651\n- manufacture of domestic refrigerating or freezing equipment, see 2750\n- manufacture of domestic fans, see 2750\n- manufacture of electrical welding and soldering equipment, see 2790\n- manufacture of agricultural spraying machinery, see 2821\n- manufacture of metal or glass rolling machinery and cylinders thereof, see 2823, 2829\n- manufacture of agricultural dryers, see 2825\n- manufacture of machinery for filtering or purifying food, see 2825\n- manufacture of cream separators, see 2825\n- manufacture of commercial clothes dryers, see 2826\n- manufacture of textile printing machinery, see 2826",
	},
	{
		id: '44b5dcfa-afc0-4134-9ae6-61bdbcae2ab2',
		name: '9312:Activities of sports clubs',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9312 Description: Activities of sports clubs Explanatory Note Inclusion: This class includes the activities of sports clubs, which, whether professional, semi-professional or amateur clubs, give their members the opportunity to engage in sporting activities.\n\nThis class includes:\n- operation of sports clubs:\n* football clubs\n* bowling clubs\n* swimming clubs\n* golf clubs\n* boxing clubs\n* body-building clubs\n* winter sports clubs\n* chess clubs\n* track and field clubs\n* shooting clubs, etc. Explanatory Note Exclusion: This class excludes:\n- sports instruction by individual teachers, trainers, see 8541\n- operation of sports facilities, see 9311\n- organization and operation of outdoor or indoor sports events for professionals or amateurs by sports clubs with their own facilities, see 9311',
	},
	{
		id: 'fb8ef8f1-ac26-4b78-8693-37c6c695f833',
		name: '8220:Activities of call centres',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8220 Description: Activities of call centres Explanatory Note Inclusion: This class includes: \n- activities of inbound call centres, answering calls from clients by using human operators, automatic call distribution, computer telephone integration, interactive voice response systems or similar methods to receive orders, provide product information, deal with customer requests for assistance or address customer complaints \n- activities of outbound call centers using similar methods to sell or market goods or services to potential customers, undertake market research or public opinion polling and similar activities for clients Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8c8e218e-f9aa-46d4-a3e3-d0e0900b2aab',
		name: '1520:Manufacture of footwear',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1520 Description: Manufacture of footwear Explanatory Note Inclusion: This class includes:\n- manufacture of footwear for all purposes, of any material, by any process, including moulding (see below for exceptions)\n- manufacture of leather parts of footwear: manufacture of uppers and parts of uppers, outer and inner soles, heels etc.\n- manufacture of gaiters, leggings and similar articles Explanatory Note Exclusion: This class excludes:\n- manufacture of footwear of textile material without applied soles, see 1410\n- manufacture of wooden shoe parts (e.g. heels and lasts), see 1629\n- manufacture of rubber boot and shoe heels and soles and other rubber footwear parts, see 2219\n- manufacture of plastic footwear parts, see 2220\n- manufacture of ski-boots, see 3230\n- manufacture of orthopedic shoes, see 3250',
	},
	{
		id: '0f1a113f-cb80-46ad-9385-ef4bf9c82e7e',
		name: '0125:Growing of other tree and bush fruits and nuts',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0125 Description: Growing of other tree and bush fruits and nuts Explanatory Note Inclusion: This class includes:\n- growing of berries:\n* blueberries\n* currants\n* gooseberries\n* kiwi fruit\n* raspberries\n* strawberries\n* other berries\n- growing of fruit seeds\n- growing of edible nuts:\n* almonds\n* cashew nuts\n* chestnuts\n* hazelnuts\n* pistachios\n* walnuts\n* other nuts\n- growing of other tree and bush fruits:\n* locust beans Explanatory Note Exclusion: This class excludes:\n- growing of coconuts, see 0126',
	},
	{
		id: '62706f87-94f5-4eb4-a9dc-5816de5a0dc3',
		name: '08:Other mining and quarrying',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 08 Description: Other mining and quarrying Explanatory Note Inclusion: This division includes extraction from a mine or quarry, but also dredging of alluvial deposits, rock crushing and the use of salt marshes. The products are used most notably in construction (e.g. sands, stones etc.), manufacture of materials (e.g. clay, gypsum, calcium etc.), manufacture of chemicals etc.\nThis division does not include processing (except crushing, grinding, cutting, cleaning, drying, sorting and mixing) of the minerals extracted. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e1ade212-20f2-4df5-8e10-069d4adbb164',
		name: '4669:Wholesale of waste and scrap and other products n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4669 Description: Wholesale of waste and scrap and other products n.e.c. Explanatory Note Inclusion: This class includes:\n- wholesale of industrial chemicals:\n* aniline, printing ink, essential oils, industrial gases, chemical glues, colouring matter, synthetic resin, methanol, paraffin, scents and flavourings, soda, industrial salt, acids and sulphurs, starch derivates etc.\n- wholesale of fertilizers and agrochemical products\n- wholesale of plastic materials in primary forms\n- wholesale of rubber\n- wholesale of textile fibres etc.\n- wholesale of paper in bulk\n- wholesale of precious stones\n- wholesale of metal and non-metal waste and scrap and materials for recycling, including collecting, sorting, separating, stripping of used goods such as cars in order to obtain reusable parts, packing and repacking, storage and delivery, but without a real transformation process. Additionally, the purchased and sold waste has a remaining value.\n\nThis class includes:\n- dismantling of automobiles, computers, televisions and other equipment to obtain and re-sell usable parts Explanatory Note Exclusion: This class excludes:\n- collection of household and industrial waste, see group 381\n- treatment of waste, not for a further use in an industrial manufacturing process, but with the aim of disposal, see group 382\n- processing of waste and scrap and other articles into secondary raw material when a real transformation process is required (the resulting secondary raw material is fit for direct use in an industrial manufacturing process, but is not a final product), see 3830\n- dismantling of automobiles, computers, televisions and other equipment for materials recovery, see 3830\n- shredding of cars by means of a mechanical process, see 3830\n- ship-breaking, see 3830\n- retail sale of second-hand goods, see 4774',
	},
	{
		id: 'cbe139b2-d020-400f-a962-c0a452f2fe17',
		name: '8730:Residential care activities for the elderly and disabled',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8730 Description: Residential care activities for the elderly and disabled Explanatory Note Inclusion: This class includes the provision of residential and personal care services for the elderly and disabled who are unable to fully care for themselves and/or who do not desire to live independently. The care typically includes room, board, supervision, and assistance in daily living, such as housekeeping services. In some instances these units provide skilled nursing care for residents in separate on-site facilities.\n\nThis class includes:\n- activities of:\n* assisted-living facilities\n* continuing care retirement communities\n* homes for the elderly with minimal nursing care\n* rest homes without nursing care Explanatory Note Exclusion: This class excludes:\n- activities of homes for the elderly with nursing care, see 8710\n- social work activities with accommodation where medical treatment or accommodation are not important elements, see 8790',
	},
	{
		id: 'ee18bd8d-8efd-40f7-bb53-66ce22466ff6',
		name: '4620:Wholesale of agricultural raw materials and live animals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4620 Description: Wholesale of agricultural raw materials and live animals Explanatory Note Inclusion: This class includes:\n- wholesale of grains and seeds\n- wholesale of oleaginous fruits\n- wholesale of flowers and plants\n- wholesale of unmanufactured tobacco\n- wholesale of live animals\n- wholesale of hides and skins\n- wholesale of leather\n- wholesale of agricultural material, waste, residues and by-products used for animal feed Explanatory Note Exclusion: This class excludes:\n- wholesale of textile fibres, see 4669',
	},
	{
		id: '7664dc76-e066-44ef-bd66-e4a6f1d0c9a3',
		name: '28:Manufacture of machinery and equipment n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 28 Description: Manufacture of machinery and equipment n.e.c. Explanatory Note Inclusion: This division includes the manufacture of machinery and equipment that act independently on materials either mechanically or thermally or perform operations on materials (such as handling, spraying, weighing or packing), including their mechanical components that produce and apply force, and any specially manufactured primary parts. This includes the manufacture of fixed and mobile or hand-held devices, regardless of whether they are designed for industrial, building and civil engineering, agricultural or home use. The manufacture of special equipment for passenger or freight transport within demarcated premises also belongs within this division.\nThis division distinguishes between the manufacture of special-purpose machinery, i.e. machinery for exclusive use in an ISIC industry or a small cluster of ISIC industries, and general-purpose machinery, i.e. machinery that is being used in a wide range of ISIC industries. \nThis division also includes the manufacture of other special-purpose machinery, not covered elsewhere in the classification, whether or not used in a manufacturing process, such as fairground amusement equipment, automatic bowling alley equipment, etc.\n\nThis division excludes the manufacture of metal products for general use (division 25), associated control devices, computer equipment, measurement and testing equipment, electricity distribution and control apparatus (divisions 26 and 27) and general-purpose motor vehicles (divisions 29 and 30). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e62671c5-0e31-47c3-a367-1b965de9cc35',
		name: '42:Civil engineering',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 42 Description: Civil engineering Explanatory Note Inclusion: This division includes general construction for civil engineering objects. It includes new work, repair, additions and alterations, the erection of pre-fabricated structures on the site and also construction of temporary nature.\n\nIncluded is the construction of heavy constructions such as motorways, streets, bridges, tunnels, railways, airfields, harbours and other water projects, irrigation systems, sewerage systems, industrial facilities, pipelines and electric lines, outdoor sports facilities, etc. This work can be carried out on own account or on a fee or contract basis. Portions of the work and sometimes even the whole practical work can be subcontracted out. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c4b43057-814e-44f9-a8fe-6c36d3009cfd',
		name: '3020:Manufacture of railway locomotives and rolling stock',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3020 Description: Manufacture of railway locomotives and rolling stock Explanatory Note Inclusion: This class includes:\n- manufacture of electric, diesel, steam and other rail locomotives\n- manufacture of self-propelled railway or tramway coaches, vans and trucks, maintenance or service vehicles\n- manufacture of railway or tramway rolling stock, not self-propelled:\n* passenger coaches, goods vans, tank wagons, self-discharging vans and wagons, workshop vans, crane vans, tenders etc.\n- manufacture of specialized parts of railway or tramway locomotives or of rolling stock:\n* bogies, axles and wheels, brakes and parts of brakes; hooks and coupling devices, buffers and buffer parts; shock absorbers; wagon and locomotive frames; bodies; corridor connections etc.\n\nThis class also includes:\n- manufacture of mechanical and electromechanical signalling, safety and traffic control equipment for railways, tramways, inland waterways, roads, parking facilities, airfields etc.\n- manufacture of mining locomotives and mining rail cars\n- manufacture of railway car seats Explanatory Note Exclusion: This class excludes:\n- manufacture of unassembled rails, see 2410\n- manufacture of assembled railway track fixtures, see 2599\n- manufacture of electric motors, see 2710\n- manufacture of electrical signalling, safety or traffic-control equipment, see 2790\n- manufacture of engines and turbines, see 2811',
	},
	{
		id: '78ebae3a-f7a4-4200-9ee9-dd128f5f68b7',
		name: '521:Warehousing and storage',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 521 Description: Warehousing and storage Explanatory Note Inclusion: See class 5210. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'fe48499d-c72b-4865-9c01-fb8daff5fccd',
		name: '0510:Mining of hard coal',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0510 Description: Mining of hard coal Explanatory Note Inclusion: This class includes:\n- mining of hard coal: underground or surface mining, including mining through liquefaction methods\n- cleaning, sizing, grading, pulverizing, compressing etc. of coal to classify, improve quality or facilitate transport or storage\n\nThis class also includes:\n- recovery of hard coal from culm banks Explanatory Note Exclusion: This class excludes:\n- lignite mining, see 0520\n- peat digging and agglomeration of peat, see 0892\n- test drilling for coal mining, see 0990\n- support activities for hard coal mining, see 0990\n- coke ovens producing solid fuels, see 1910\n- manufacture of hard coal briquettes, see 1920\n- work performed to develop or prepare properties for coal mining, see 4312',
	},
	{
		id: 'f91ce0d0-b072-4016-b4f7-862fe6313c14',
		name: '0150:Mixed farming',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0150 Description: Mixed farming Explanatory Note Inclusion: This class includes the combined production of crops and animals without a specialized production of crops or animals. The size of the overall farming operation is not a determining factor. If either production of crops or animals in a given unit exceeds 66 per cent or more of standard gross margins, the combined activity should not be included here, but allocated to crop or animal farming. Explanatory Note Exclusion: This class excludes:\n- mixed crop farming, see groups 011 and 012\n- mixed animal farming, see group 014',
	},
	{
		id: 'ca87b631-2504-4e8b-9e21-af09d389ad3c',
		name: '85:Education',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 85 Description: Education Explanatory Note Inclusion: See section P. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '3cb50f2d-c9f9-49c6-8fcd-757990a5c925',
		name: '1103:Manufacture of malt liquors and malt',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1103 Description: Manufacture of malt liquors and malt Explanatory Note Inclusion: This class includes:\n- manufacture of malt liquors, such as beer, ale, porter and stout\n- manufacture of malt\n\nThis class also includes:\n- manufacture of low alcohol or non-alcoholic beer Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'fa8acce6-9ec3-4445-ae3a-c6e1f1c445d3',
		name: '7912:Tour operator activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7912 Description: Tour operator activities Explanatory Note Inclusion: This class includes:\n- arranging and assembling tours that are sold through travel agencies or directly by tour operators. The tours may include any or all of the following:\n* transportation\n* accommodation\n* food\n* visits to museums, historical or cultural sites, theatrical, musical or sporting events Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2e230f2b-db03-4cc3-b350-5606e04d2aa0',
		name: '3600:Water collection, treatment and supply',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3600 Description: Water collection, treatment and supply Explanatory Note Inclusion: This class includes water collection, treatment and distribution activities for domestic and industrial needs. Collection of water from various sources, as well as distribution by various means is included.\nThe operation of irrigation canals is also included; however the provision of irrigation services through sprinklers, and similar agricultural support services, is not included.\n\nThis class includes:\n- collection of water from rivers, lakes, wells etc.\n- collection of rain water\n- purification of water for water supply purposes\n- treatment of water for industrial and other purposes\n- desalting of sea or ground water to produce water as the principal product of interest\n- distribution of water through mains, by trucks or other means\n- operation of irrigation canals Explanatory Note Exclusion: This class excludes:\n- operation of irrigation equipment for agricultural purposes, see 0161\n- treatment of wastewater in order to prevent pollution, see 3700\n- (long-distance) transport of water via pipelines, see 4930',
	},
	{
		id: '25fba606-c173-4727-b3da-0482d158fc01',
		name: '0143:Raising of camels and camelids',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0143 Description: Raising of camels and camelids Explanatory Note Inclusion: This class includes:\n- raising and breeding of camels (dromedary) and camelids Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8115fc78-0fa7-4471-8601-4135250c2b98',
		name: '38:Waste collection, treatment and disposal activities; materials recovery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 38 Description: Waste collection, treatment and disposal activities; materials recovery Explanatory Note Inclusion: This division includes the collection, treatment, and disposal of waste materials. This also includes local hauling of waste materials and the operation of materials recovery facilities (i.e. those that sort recoverable materials from a waste stream). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '56e2d368-6848-43d0-9e13-056e632314a3',
		name: '242:Manufacture of basic precious and other non-ferrous metals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 242 Description: Manufacture of basic precious and other non-ferrous metals Explanatory Note Inclusion: See class 2420. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd81711e6-4fae-499e-8d3b-86a97f871b61',
		name: '6419:Other monetary intermediation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6419 Description: Other monetary intermediation Explanatory Note Inclusion: This class includes the receiving of deposits and/or close substitutes for deposits and extending of credit or lending funds. The granting of credit can take a variety of forms, such as loans, mortgages, credit cards etc. These activities are generally carried out by monetary institutions other than central banks, such as:\n- banks\n- savings banks\n- credit unions\n\nThis class also includes:\n- postal giro and postal savings bank activities\n- credit granting for house purchase by specialized deposit-taking institutions\n- money order activities Explanatory Note Exclusion: This class excludes:\n- credit granting for house purchase by specialized non-depository institutions, see 6492\n- credit card transaction processing and settlement activities, see 6619',
	},
	{
		id: '73f9f9ce-f9bd-4387-bbc1-e1287a54ee9a',
		name: '013:Plant propagation',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 013 Description: Plant propagation Explanatory Note Inclusion: See class 0130. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '30a339e1-6e7d-49c7-b522-e2f5289179b4',
		name: '4799:Other retail sale not in stores, stalls or markets',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4799 Description: Other retail sale not in stores, stalls or markets Explanatory Note Inclusion: This class includes:\n- retail sale of any kind of product in any way that is not included in previous classes:\n* by direct sales or door-to-door sales persons\n* through vending machines etc.\n- direct selling of fuel (heating oil, fire wood etc.), delivered directly to the customers premises\n- activities of non-store auctions (retail)\n- retail sale by (non-store) commission agents Explanatory Note Exclusion: This class excludes:\n- delivery of products by stores, see groups 471-477',
	},
	{
		id: 'e1b81e79-f7cb-4e12-b089-194c23c89001',
		name: 'M:Professional, scientific and technical activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: M Description: Professional, scientific and technical activities Explanatory Note Inclusion: This section includes specialized professional, scientific and technical activities. These activities require a high degree of training, and make specialized knowledge and skills available to users. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd311de25-ded7-47f0-8100-cfb3177ee595',
		name: '5011:Sea and coastal passenger water transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5011 Description: Sea and coastal passenger water transport Explanatory Note Inclusion: This class includes:\n- transport of passengers over seas and coastal waters, whether scheduled or not:\n* operation of excursion, cruise or sightseeing boats\n* operation of ferries, water taxis etc.\n\nThis class also includes:\n- renting of pleasure boats with crew for sea and coastal water transport (e.g. for fishing cruises) Explanatory Note Exclusion: This class excludes:\n- restaurant and bar activities on board ships, when provided by separate units, see 5610, 5630\n- operation of "floating casinos", see 9200',
	},
	{
		id: 'ac5f1d74-0746-42a2-8196-72a5e88d813e',
		name: '432:Electrical, plumbing and other construction installation activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 432 Description: Electrical, plumbing and other construction installation activities Explanatory Note Inclusion: This group includes installation activities that support the functioning of a building as such, including installation of electrical systems, plumbing (water, gas and sewage systems), heat and air-conditioning systems, elevators etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '538be621-8ba5-4048-a6c4-b12940fd3183',
		name: '410:Construction of buildings',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 410 Description: Construction of buildings Explanatory Note Inclusion: See class 4100. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7ccf5f14-de30-47ed-ad5e-bdd7f205b965',
		name: '1030:Processing and preserving of fruit and vegetables',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1030 Description: Processing and preserving of fruit and vegetables Explanatory Note Inclusion: This class includes:\n- manufacture of food consisting chiefly of fruit or vegetables, except ready-made dishes in frozen or canned form\n- preserving of fruit, nuts or vegetables: freezing, drying, immersing in oil or in vinegar, canning etc.\n- manufacture of fruit or vegetable food products\n- manufacture of fruit or vegetable juices\n- manufacture of jams, marmalades and table jellies\n- processing and preserving of potatoes:\n* manufacture of prepared frozen potatoes\n* manufacture of dehydrated mashed potatoes\n* manufacture of potato snacks\n* manufacture of potato crisps\n* manufacture of potato flour and meal\n- roasting of nuts\n- manufacture of nut foods and pastes\n\nThis class also includes:\n- industrial peeling of potatoes\n- production of concentrates from fresh fruits and vegetables\n- manufacture of perishable prepared foods of fruit and vegetables, such as:\n* salads\n* peeled or cut vegetables\n* tofu (bean curd) Explanatory Note Exclusion: This class excludes:\n- manufacture of flour or meal of dried leguminous vegetables, see 1061\n- preservation of fruit and nuts in sugar, see 1073\n- manufacture of prepared vegetable dishes, see 1075\n- manufacture of artificial concentrates, see 1079',
	},
	{
		id: '685d95dd-df61-400c-b6fb-c1ef743e3c04',
		name: '9512:Repair of communication equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9512 Description: Repair of communication equipment Explanatory Note Inclusion: This class includes:\n- repair and maintenance of communications equipment such as:\n* cordless telephones\n* cellular phones\n* carrier equipment modems\n* fax machines\n* communications transmission equipment (e.g. routers, bridges, modems)\n* two-way radios\n* commercial TV and video cameras Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '31322c48-c668-465b-8896-2a2ae1ccd557',
		name: '051:Mining of hard coal',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 051 Description: Mining of hard coal Explanatory Note Inclusion: See class 0510. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '92951421-66a9-434b-81ef-01b4776e9214',
		name: '7820:Temporary employment agency activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 7820 Description: Temporary employment agency activities Explanatory Note Inclusion: This class includes:\n- supplying workers to clients' businesses for limited periods of time to temporarily replace or supplement the working force of the client, where the individuals provided are employees of the temporary help service unit\n\nUnits classified here do not provide direct supervision of their employees at the clients' work sites. Explanatory Note Exclusion: [Empty]",
	},
	{
		id: '189b4b3d-c1a9-4192-b021-8298cb4f5999',
		name: '021:Silviculture and other forestry activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 021 Description: Silviculture and other forestry activities Explanatory Note Inclusion: See class 0210. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '32e33aa2-5b06-4405-8169-f5ddbc66cfe6',
		name: '5920:Sound recording and music publishing activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5920 Description: Sound recording and music publishing activities Explanatory Note Inclusion: This class includes:\n- production of original (sound) master recordings, such as tapes, CDs\n- sound recording service activities in a studio or elsewhere, including the production of taped (i.e. non-live) radio programming, audio for film, television etc.\n- music publishing, i.e. activities of:\n* acquiring and registering copyrights for musical compositions\n* promoting, authorizing and using these compositions in recordings, radio, television, motion pictures, live performances, print and other media\n* distributing sound recordings to wholesalers, retailers or directly to the public\n\nUnits engaged in these activities may own the copyright or act as administrator of the music copyrights on behalf of the copyright owners. \n\nThis class also includes:\n- publishing of music and sheet books Explanatory Note Exclusion: This class excludes:\n- reproduction from master copies of music or other sound recordings, see 1820\n- wholesale of recorded audio tapes and disks, see 4649',
	},
	{
		id: '05d7b700-860c-4ea2-8e40-12844bbd5ee1',
		name: '51:Air transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 51 Description: Air transport Explanatory Note Inclusion: This division includes the transport of passengers or freight by air or via space.\n\nThis division excludes the overhaul of aircraft or aircraft engines (see class 3315) and support activities, such as the operation of airports, (see class 5223). This division also excludes activities that make use of aircraft, but not for the purpose of transportation, such as crop spraying (see class 0161), aerial advertising (see class 7310) or aerial photography (see class 7420). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8086a574-5613-476c-a7a6-53a8a2a2c582',
		name: '71:Architectural and engineering activities; technical testing and analysis',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 71 Description: Architectural and engineering activities; technical testing and analysis Explanatory Note Inclusion: This division includes the provision of architectural services, engineering services, drafting services, building inspection services and surveying and mapping services. It also includes the performance of physical, chemical, and other analytical testing services. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a16b303d-d3d2-40a5-934a-8648c24dfe9a',
		name: '5510:Short term accommodation activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5510 Description: Short term accommodation activities Explanatory Note Inclusion: This class includes the provision of accommodation, typically on a daily or weekly basis, principally for short stay by visitors. This includes the provision of furnished accommodation in guest rooms and suites or complete self-contained units with kitchens, with or without daily or other regular housekeeping services, and may often include a range of additional services such as food and beverage services, parking, laundry services, swimming pools and exercise rooms, recreational facilities and conference and convention facilities.\n\nThis class includes the provision of short-term accommodation provided by:\n- hotels\n- resort hotels \n- suite / apartment hotels\n- motels\n- motor hotels\n- guesthouses\n- pensions \n- bed and breakfast units\n- visitor flats and bungalows\n- time-share units\n- holiday homes\n- chalets, housekeeping cottages and cabins\n- youth hostels and mountain refuges Explanatory Note Exclusion: This class excludes:\n- provision of homes and furnished or unfurnished flats or apartments for more permanent use, typically on a monthly or annual basis, see division 68',
	},
	{
		id: 'e5b11ea9-e6ed-401f-b47f-c3bd561c303d',
		name: '16:Manufacture of wood and of products of wood and cork, except furniture; manuf',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 16 Description: Manufacture of wood and of products of wood and cork, except furniture; manufacture of articles of straw and plaiting materials Explanatory Note Inclusion: This division includes the manufacture of wood products, such as lumber, plywood, veneers, wood containers, wood flooring, wood trusses, and prefabricated wood buildings. The production processes include sawing, planing, shaping, laminating, and assembling of wood products starting from logs that are cut into bolts, or lumber that may then be cut further, or shaped by lathes or other shaping tools. The lumber or other transformed wood shapes may also be subsequently planed or smoothed, and assembled into finished products, such as wood containers.\nWith the exception of sawmilling, this division is subdivided mainly based on the specific products manufactured.\n\nThis division does not include the manufacture of furniture (3100), or the installation of wooden fittings and the like (4330). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '88ef0d81-5e89-4ea5-962f-e450f531cd70',
		name: '4390:Other specialized construction activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4390 Description: Other specialized construction activities Explanatory Note Inclusion: This class includes:\n- construction activities specializing in one aspect common to different kind of structures, requiring specialized skill or equipment:\n* construction of foundations, including pile driving\n* damp proofing and water proofing works\n* de-humidification of buildings\n* shaft sinking\n* erection of non-self-manufactured steel elements\n* steel bending\n* bricklaying and stone setting\n* roof covering for residential buildings\n* scaffolds and work platform erecting and dismantling, excluding renting of scaffolds and work platforms\n* erection of chimneys and industrial ovens\n* work with specialist access requirements necessitating climbing skills and the use of related equipment, e.g. working at height on tall structures\n- subsurface work\n- construction of outdoor swimming pools\n- steam cleaning, sand blasting and similar activities for building exteriors\n- renting of cranes with operator Explanatory Note Exclusion: This class excludes:\n- renting of construction machinery and equipment without operator, see 7730',
	},
	{
		id: '87e789a9-27dd-4889-b76a-248bdcf2d29e',
		name: '4610:Wholesale on a fee or contract basis',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4610 Description: Wholesale on a fee or contract basis Explanatory Note Inclusion: This class includes:\n- activities of commission agents and all other wholesalers who trade on behalf and on the account of others\n- activities of those involved in bringing sellers and buyers together or undertaking commercial transactions on behalf of a principal, including on the internet\n- such agents involved in the sale of:\n* agricultural raw materials, live animals, textile raw materials and semi-finished goods\n* fuels, ores, metals and industrial chemicals, including fertilizers\n* food, beverages and tobacco\n* textiles, clothing, fur, footwear and leather goods\n* timber and building materials\n* machinery, including office machinery and computers, industrial equipment, ships and aircraft\n* furniture, household goods and hardware\n\nThis class also includes:\n- activities of wholesale auctioneering houses Explanatory Note Exclusion: This class excludes:\n- wholesale trade in own name, see groups 462 to 469\n- activities of commission agents for motor vehicles, see 4510\n- auctions of motor vehicles, see 4510\n- retail sale by non-store commission agents, see 4799\n- activities of insurance agents, see 6622\n- activities of real estate agents, see 6820',
	},
	{
		id: 'b2cadc8e-c50b-48cc-88b9-a646bbc72f6b',
		name: '099:Support activities for other mining and quarrying',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 099 Description: Support activities for other mining and quarrying Explanatory Note Inclusion: See class 0990. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c2483001-f821-4116-bc83-c8833ecc6c69',
		name: '853:Higher education',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 853 Description: Higher education Explanatory Note Inclusion: See class 8530. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4473eebe-d87a-43a7-b253-7c77b425f3c2',
		name: '016:Support activities to agriculture and post-harvest crop activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 016 Description: Support activities to agriculture and post-harvest crop activities Explanatory Note Inclusion: This group includes activities incidental to agricultural production and activities similar to agriculture not undertaken for production purposes (in the sense of harvesting agricultural products), done on a fee or contract basis. Also included are post-harvest crop activities, aimed at preparing agricultural products for the primary market. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4cc1385d-e1c8-44e0-a8fa-284d16442787',
		name: '0145:Raising of swine/pigs',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0145 Description: Raising of swine/pigs Explanatory Note Inclusion: This class includes:\n- raising and breeding of swine (pigs) Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9c9d96f5-5a31-4f53-b1c2-201cb01a5d1a',
		name: '477:Retail sale of other goods in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 477 Description: Retail sale of other goods in specialized stores Explanatory Note Inclusion: This group includes the sale in specialized stores carrying a particular line of products not included in other parts of the classification, such as clothing, footwear and leather articles, pharmaceutical and medical goods, watches, souvenirs, cleaning materials, weapons, flowers and pets and others. Also included is the retail sale of used goods in specialized stores. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '16576d24-aac9-415c-9ca9-d537044b9da8',
		name: '3311:Repair of fabricated metal products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3311 Description: Repair of fabricated metal products Explanatory Note Inclusion: This class includes the repair and maintenance of fabricated metal products of division 25.\n\nThis class includes:\n- repair of metal tanks, reservoirs and containers\n- repair and maintenance for pipes and pipelines\n- mobile welding repair\n- repair of steel shipping drums\n- repair and maintenance of steam or other vapour generators\n- repair and maintenance of auxiliary plant for use with steam generators:\n* condensers, economizers, superheaters, steam collectors and accumulators\n- repair and maintenance of nuclear reactors, except isotope separators\n- repair and maintenance of parts for marine or power boilers\n- platework repair of central heating boilers and radiators\n- repair and maintenance of fire arms and ordnance (including repair of sporting and recreational guns) Explanatory Note Exclusion: This class excludes:\n- repair of central heating systems etc., see 4322\n- repair of mechanical locking devices, safes etc., see 8020',
	},
	{
		id: '2599d2c3-0891-49a5-a80c-1add95ca3e2b',
		name: '4321:Electrical installation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4321 Description: Electrical installation Explanatory Note Inclusion: This class includes the installation of electrical systems in all kinds of buildings and civil engineering structures.\n\nThis class includes:\n- installation of:\n* electrical wiring and fittings\n* telecommunications wiring\n* computer network and cable television wiring, including fibre optic\n* satellite dishes\n* lighting systems\n* fire alarms\n* burglar alarm systems\n* street lighting and electrical signals\n* airport runway lighting\n\nThis class also includes:\n- connecting of electric appliances and household equipment, including baseboard heating Explanatory Note Exclusion: This class excludes:\n- construction of communications and power transmission lines, see 4220\n- monitoring or remote monitoring of electronic security alarm systems, such as burglar and fire alarms, including their maintenance, see 8020',
	},
	{
		id: '318d6a83-d35d-4cb9-8555-f26601ee1c6b',
		name: '4791:Retail sale via mail order houses or via Internet',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4791 Description: Retail sale via mail order houses or via Internet Explanatory Note Inclusion: This class includes retail sale activities via mail order houses or via Internet, i.e. retail sale activities where the buyer makes his choice on the basis of advertisements, catalogues, information provided on a website, models or any other means of advertising and places his order by mail, phone or over the Internet (usually through special means provided by a website). The products purchased can be either directly downloaded from the Internet or physically delivered to the customer.\n\nThis class includes:\n- retail sale of any kind of product by mail order \n- retail sale of any kind of product over the Internet\n\nThis class also includes:\n- direct sale via television, radio and telephone\n- Internet retail auctions Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0c446550-80b2-4304-93f9-a555ab0ef7c9',
		name: '1010:Processing and preserving of meat',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1010 Description: Processing and preserving of meat Explanatory Note Inclusion: This class includes:\n- operation of slaughterhouses engaged in killing, dressing or packing meat: beef, pork, poultry, lamb, rabbit, mutton, camel, etc.\n- production of fresh, chilled or frozen meat, in carcasses\n- production of fresh, chilled or frozen meat, in cuts\n- production of fresh, chilled or frozen meat, in individual portions\n- production of dried, salted or smoked meat\n- production of meat products:\n* sausages, salami, puddings, "andouillettes", saveloys, bolognas, p\u00e2t\u00e9s, rillettes, boiled ham\n\nThis class also includes:\n- slaughtering and processing of whales on land or on specialized vessels\n- production of hides and skins originating from slaughterhouses, including fellmongery\n- rendering of lard and other edible fats of animal origin\n- processing of animal offal\n- production of pulled wool\n- production of feathers and down Explanatory Note Exclusion: This class excludes:\n- manufacture of prepared frozen meat and poultry dishes, see 1075\n- manufacture of soup containing meat, see 1079\n- wholesale trade of meat, see 4630\n- packaging of meat, see 8292',
	},
	{
		id: '4064a80b-0844-4755-a5d4-d732cc78cc5c',
		name: '2710:Manufacture of electric motors, generators, transformers and electricity di',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2710 Description: Manufacture of electric motors, generators, transformers and electricity distribution and control apparatus Explanatory Note Inclusion: This class includes the manufacture of power, distribution and specialty transformers; electric motors, generators and motor generator sets; switchgear and switchboard apparatus; relays and industrial controls. The electrical equipment manufactured in this class is for distribution level voltages.\n\nThis class includes:\n- manufacture of distribution transformers, electric\n- manufacture of arc-welding transformers\n- manufacture of fluorescent ballasts (i.e. transformers)\n- manufacture of substation transformers for electric power distribution\n- manufacture of transmission and distribution voltage regulators\n- manufacture of electric motors (except internal combustion engine starting motors)\n- manufacture of power generators (except battery charging alternators for internal combustion engines)\n- manufacture of motor generator sets (except turbine generator set units)\n- manufacture of prime mover generator sets\n- rewinding of armatures on a factory basis\n- manufacture of power circuit breakers\n- manufacture of surge suppressors (for distribution level voltage)\n- manufacture of control panels for electric power distribution\n- manufacture of electrical relays\n- manufacture of duct for electrical switchboard apparatus\n- manufacture of electric fuses\n- manufacture of power switching equipment\n- manufacture of electric power switches (except pushbutton, snap, solenoid, tumbler) Explanatory Note Exclusion: This class excludes:\n- manufacture of electronic component-type transformers and switches, see 2610\n- manufacture of environmental controls and industrial process control instruments, see 2651\n- manufacture of switches for electrical circuits, such as pushbutton and snap switches, see 2733\n- manufacture of electric welding and soldering equipment, see 2790\n- manufacture of solid state inverters, rectifiers and converters, see 2790\n- manufacture of turbine-generator sets, see 2811\n- manufacture of starting motors and generators for internal combustion engines, see 2930',
	},
	{
		id: '28af4e26-2b7d-460e-92df-078b1404d466',
		name: '7110:Architectural and engineering activities and related technical consultancy',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7110 Description: Architectural and engineering activities and related technical consultancy Explanatory Note Inclusion: This class includes the provision of architectural services, engineering services, drafting services, building inspection services and surveying and mapping services and the like.\n\nThis class includes:\n- architectural consulting activities:\n* building design and drafting\n* town and city planning and landscape architecture\n- engineering design (i.e. applying physical laws and principles of engineering in the design of machines, materials, instruments, structures, processes and systems) and consulting activities for:\n* machinery, industrial processes and industrial plant\n* projects involving civil engineering, hydraulic engineering, traffic engineering\n* water management projects\n* projects elaboration and realization relative to electrical and electronic engineering, mining engineering, chemical engineering, mechanical, industrial and systems engineering, safety engineering\n* project management activities related to construction\n- elaboration of projects using air conditioning, refrigeration, sanitary and pollution control engineering, acoustical engineering etc.\n- geophysical, geologic and seismic surveying\n- geodetic surveying activities:\n* land and boundary surveying activities\n* hydrologic surveying activities\n* subsurface surveying activities\n* cartographic and spatial information activities Explanatory Note Exclusion: This class excludes:\n- test drilling in connection with mining operations, see 0910, 0990\n- development or publishing of associated software, see 5820, 6201\n- activities of computer consultants, see 6202, 6209\n- technical testing, see 7120\n- research and development activities related to engineering, see 7210\n- industrial design, see 7410\n- interior decorating, see 7410\n- aerial photography, see 7420',
	},
	{
		id: '69c37e71-4958-4fa1-8e6c-68ea3d4176cc',
		name: '4510:Sale of motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4510 Description: Sale of motor vehicles Explanatory Note Inclusion: This class includes:\n- wholesale and retail sale of new and used vehicles:\n* passenger motor vehicles, including specialized passenger motor vehicles such as ambulances and minibuses, etc.\n* lorries, trailers and semi-trailers\n* camping vehicles such as caravans and motor homes\n\nThis class also includes:\n- wholesale and retail sale of off-road motor vehicles (jeeps, etc.)\n- wholesale and retail sale by commission agents\n- car auctions Explanatory Note Exclusion: This class excludes:\n- wholesale and retail sale of parts and accessories for motor vehicles, see 4530\n- renting of motor vehicles with driver, see 4922\n- renting of trucks with driver, see 4923\n- renting of motor vehicles and trucks without driver, see 7710',
	},
	{
		id: '6709702f-062f-411b-9d54-baadfdd62383',
		name: '4911:Passenger rail transport, interurban',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4911 Description: Passenger rail transport, interurban Explanatory Note Inclusion: This class includes:\n- passenger transport by inter-urban railways \n- operation of sleeping cars or dining cars as an integrated operation of railway companies Explanatory Note Exclusion: This class excludes:\n- passenger transport by urban and suburban transit systems, see 4921\n- passenger terminal activities, see 5221\n- operation of sleeping cars or dining cars when operated by separate units, see 5590, 5610',
	},
	{
		id: '4efeec95-f665-4ce4-a099-0d9980a8bef3',
		name: '2396:Cutting, shaping and finishing of stone',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2396 Description: Cutting, shaping and finishing of stone Explanatory Note Inclusion: This class includes:\n- cutting, shaping and finishing of stone for use in construction, in cemeteries, on roads, as roofing etc.\n- manufacture of stone furniture Explanatory Note Exclusion: This class excludes:\n- production of rough cut stone, i.e. quarrying activities, see 0810\n- production of millstones, abrasive stones and similar products, see 2399\n- activities of sculptors, see 9000',
	},
	{
		id: '627be0b2-04e5-4179-b1eb-98755b9dda04',
		name: '162:Manufacture of products of wood, cork, straw and plaiting materials',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 162 Description: Manufacture of products of wood, cork, straw and plaiting materials Explanatory Note Inclusion: This group includes the manufacture of products of wood, cork, straw or plaiting materials, including basic shapes as well as assembled products. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ad794b11-6c9c-460b-b57e-952af0f12621',
		name: '94:Activities of membership organizations',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 94 Description: Activities of membership organizations Explanatory Note Inclusion: This division includes activities of organizations representing interests of special groups or promoting ideas to the general public. These organizations usually have a constituency of members, but their activities may involve and benefit non-members as well. The primary breakdown of this division is determined by the purpose that these organizations serve, namely interests of employers, self-employed individuals and the scientific community (group 941), interests of employees (group 942) or promotion of religious, political, cultural, educational or recreational ideas and activities (group 949). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '6b2461a8-606e-4a28-bbde-25b062b46c68',
		name: '5629:Other food service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5629 Description: Other food service activities Explanatory Note Inclusion: This class includes industrial catering, i.e. the provision of food services based on contractual arrangements with the customer, for a specific period of time. \nAlso included is the operation of food concessions at sports and similar facilities. The food is often prepared in a central unit.\n\nThis class includes:\n- activities of food service contractors (e.g. for transportation companies)\n- operation of food concessions at sports and similar facilities\n- operation of canteens or cafeterias (e.g. for factories, offices, hospitals or schools) on a concession basis Explanatory Note Exclusion: This class excludes:\n- manufacture of perishable food items for resale, see 1079\n- retail sale of perishable food items, see division 47',
	},
	{
		id: '7fb3da09-4058-4fc6-a4d2-172f39201d9c',
		name: '812:Cleaning activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 812 Description: Cleaning activities Explanatory Note Inclusion: This group includes the activities of general interior cleaning of all types of buildings, exterior cleaning of buildings, specialized cleaning activities for buildings or other specialized cleaning activities, cleaning of industrial machinery, cleaning of the inside of road and sea tankers, disinfecting and extermination activities for buildings and industrial machinery, bottle cleaning, street sweeping, snow and ice removal. Explanatory Note Exclusion: This group excludes:\n- agricultural pest control, see 0161\n- cleaning of new buildings immediately after construction, 4330\n- steam-cleaning, sand blasting and similar activities for building exteriors, see 4390\n- carpet and rug shampooing, drapery and curtain cleaning, see 9601',
	},
	{
		id: 'b6c93c05-cb0e-42e3-9258-203bc529c6ed',
		name: '9609:Other personal service activities n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 9609 Description: Other personal service activities n.e.c. Explanatory Note Inclusion: This class includes:\n- activities of Turkish baths, sauna and steam baths, solariums, reducing and slendering salons, massage salons etc.\n- astrological and spiritualists' activities\n- social activities such as escort services, dating services, services of marriage bureaux\n- pet care services such as boarding, grooming, sitting and training pets\n- genealogical organizations\n- shoe shiners, porters, valet car parkers etc.\n- concession operation of coin-operated personal service machines (photo booths, weighing machines, machines for checking blood pressure, coin-operated lockers etc.) Explanatory Note Exclusion: This class excludes:\n- veterinary activities, see 7500\n- activities of fitness centers, see 9311",
	},
	{
		id: 'e308e709-f433-4e37-878e-485d92c51678',
		name: '1391:Manufacture of knitted and crocheted fabrics',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1391 Description: Manufacture of knitted and crocheted fabrics Explanatory Note Inclusion: This class includes:\n- manufacture and processing of knitted or crocheted fabrics:\n* pile and terry fabrics\n* net and window furnishing type fabrics knitted on Raschel or similar machines\n* other knitted or crocheted fabrics\n\nThis class also includes:\n- manufacture of imitation fur by knitting Explanatory Note Exclusion: This class excludes:\n- manufacture of net and window furnishing type fabrics of lace knitted on Raschel or similar machines, see 1399\n- manufacture of knitted and crocheted apparel, see 1430',
	},
	{
		id: '5231e126-0927-4ea1-bc82-3177caaf01f4',
		name: '360:Water collection, treatment and supply',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 360 Description: Water collection, treatment and supply Explanatory Note Inclusion: See class 3600. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e6fa10d5-8e2c-490a-90ee-bcdf56957ee9',
		name: '4751:Retail sale of textiles in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4751 Description: Retail sale of textiles in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of fabrics\n- retail sale of knitting yarn\n- retail sale of basic materials for rug, tapestry or embroidery making\n- retail sale of textiles\n- retail sale of haberdashery: needles, sewing thread etc. Explanatory Note Exclusion: This class excludes:\n- retail sale of clothing, see 4771',
	},
	{
		id: 'b4391732-e9c7-4b32-a265-3f6bec21baa5',
		name: '09:Mining support service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 09 Description: Mining support service activities Explanatory Note Inclusion: This division includes specialized support services incidental to mining provided on a fee or contract basis. It includes exploration services through traditional prospecting methods such as taking core samples and making geological observations as well as drilling, test-drilling or redrilling for oil wells, metallic and non-metallic minerals. Other typical services cover building oil and gas well foundations, cementing oil and gas well casings, cleaning, bailing and swabbing oil and gas wells, draining and pumping mines, overburden removal services at mines, etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'db4426be-6d18-4741-b56e-2bb9f521fa32',
		name: 'L:Real estate activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: L Description: Real estate activities Explanatory Note Inclusion: This section includes acting as lessors, agents and/or brokers in one or more of the following: selling or buying real estate, renting real estate, providing other real estate services such as appraising real estate or acting as real estate escrow agents. Activities in this section may be carried out on own or leased property and may be done on a fee or contract basis. Also included is the building of structures, combined with maintaining ownership or leasing of such structures.\n\nThis section includes real estate property managers. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '1f8beaf0-bad2-432d-923a-ee164f4cefd6',
		name: '81:Services to buildings and landscape activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 81 Description: Services to buildings and landscape activities Explanatory Note Inclusion: This division includes the provision of a number of general support services, such as the provision of a combination of support services within a client's facilities, the interior and exterior cleaning of buildings of all types, cleaning of industrial machinery, cleaning of trains, buses, planes, etc., cleaning of the inside of road and sea tankers, disinfecting and exterminating activities for buildings, ships, trains, etc., bottle cleaning, street sweeping, snow and ice removal, provision of landscape care and maintenance services and provision of these services along with the design of landscape plans and/or the construction (i.e. installation) of walkways, retaining walls, decks, fences, ponds, and similar structures. Explanatory Note Exclusion: [Empty]",
	},
	{
		id: 'e34f6701-d087-4902-b024-368b15a20b22',
		name: '1071:Manufacture of bakery products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1071 Description: Manufacture of bakery products Explanatory Note Inclusion: This class includes the manufacture of fresh, frozen or dry bakery products.\n\nThis class includes:\n- manufacture of bread and rolls\n- manufacture of fresh pastry, cakes, pies, tarts etc.\n- manufacture of rusks, biscuits and other "dry" bakery products\n- manufacture of preserved pastry goods and cakes\n- manufacture of snack products (cookies, crackers, pretzels etc.), whether sweet or salted\n- manufacture of tortillas\n- manufacture of frozen bakery products: pancakes, waffles, rolls etc. Explanatory Note Exclusion: This class excludes:\n- manufacture of farinaceous products (pastas), see 1074\n- manufacture of potato snacks, see 1030\n- heating up of bakery items for immediate consumption, see division 56',
	},
	{
		id: '2b554999-32f9-4fc0-b195-fad10e12a9bb',
		name: '60:Programming and broadcasting activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 60 Description: Programming and broadcasting activities Explanatory Note Inclusion: This division includes the activities of creating content or acquiring the right to distribute content and subsequently broadcasting that content, such as radio, television and data programs of entertainment, news, talk, and the like. Also included is data broadcasting, typically integrated with radio or TV broadcasting. The broadcasting can be performed using different technologies, over-the-air, via satellite, via a cable network or via Internet. This division also includes the production of programs that are typically narrowcast in nature (limited format, such as news, sports, education or youth-oriented programming) on a subscription or fee basis, to a third party, for subsequent broadcasting to the public.\n\nThis division excludes the distribution of cable and other subscription programming (see division 61). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4e244769-0c3d-482a-922d-3e3430cbf97d',
		name: '552:Camping grounds, recreational vehicle parks and trailer parks',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 552 Description: Camping grounds, recreational vehicle parks and trailer parks Explanatory Note Inclusion: See class 5520. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5fa09b50-bd51-463e-8048-bcfb478b1e85',
		name: '2593:Manufacture of cutlery, hand tools and general hardware',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 2593 Description: Manufacture of cutlery, hand tools and general hardware Explanatory Note Inclusion: This class includes:\n- manufacture of domestic cutlery such as knives, forks, spoons etc.\n- manufacture of other articles of cutlery:\n* cleavers and choppers\n* razors and razor blades\n* scissors and hair clippers\n- manufacture of knives and cutting blades for machines or for mechanical appliances\n- manufacture of hand tools such as pliers, screwdrivers etc.\n- manufacture of non-power-driven agricultural hand tools\n- manufacture of saws and saw blades, including circular saw blades and chainsaw blades\n- manufacture of interchangeable tools for hand tools, whether or not power-operated, or for machine tools: drills, punches, milling cutters etc.\n- manufacture of press tools\n- manufacture of blacksmiths' tools: forges, anvils etc.\n- manufacture of moulding boxes and moulds (except ingot moulds)\n- manufacture of vices, clamps\n- manufacture of padlocks, locks, keys, hinges and the like, hardware for buildings, furniture, vehicles etc.\n- manufacture of cutlasses, swords, bayonets etc. Explanatory Note Exclusion: This class excludes:\n- manufacture of hollowware (pots, kettles etc.), dinnerware (bowls, platters etc.) or flatware (plates, saucers etc.), see 2599\n- manufacture of power-driven hand tools, see 2818\n- manufacture of ingot moulds, see 2823\n- manufacture of cutlery of precious metal, see 3211",
	},
	{
		id: 'b6e04c9b-25fd-4373-ae19-8142fa8e38b8',
		name: '8720:Residential care activities for mental retardation, mental health and subst',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8720 Description: Residential care activities for mental retardation, mental health and substance abuse Explanatory Note Inclusion: This class includes the provision of residential care (but not licensed hospital care) to people with mental retardation, mental illness, or substance abuse problems. Facilities provide room, board, protective supervision and counselling and some health care. It also includes provision of residential care and treatment for patients with mental health and substance abuse illnesses.\n\nThis class includes:\n- activities of:\n* facilities for treatment of alcoholism and drug addiction\n* psychiatric convalescent homes\n* residential group homes for the emotionally disturbed\n* mental retardation facilities\n* mental health halfway houses Explanatory Note Exclusion: This class excludes:\n- social work activities with accommodation, such as temporary homeless shelters, see 8790',
	},
	{
		id: '4da181d7-81cf-47eb-83d6-9174c052bb31',
		name: '4723:Retail sale of tobacco products in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4723 Description: Retail sale of tobacco products in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of tobacco\n- retail sale of tobacco products Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '73dc8e10-f242-4838-b7c3-9d4d08f99995',
		name: '33:Repair and installation of machinery and equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 33 Description: Repair and installation of machinery and equipment Explanatory Note Inclusion: This division includes the specialized repair of goods produced in the manufacturing sector with the aim to restore machinery, equipment and other products to working order. The provision of general or routine maintenance (i.e. servicing) on such products to ensure they work efficiently and to prevent breakdown and unnecessary repairs is included. \n\nThis division does only include specialized repair and maintenance activities. A substantial amount of repair is also done by manufacturers of machinery, equipment and other goods, in which case the classification of units engaged in these repair and manufacturing activities is done according to the value-added principle which would often assign these combined activities to the manufacture of the good. The same principle is applied for combined trade and repair. \n\nThe rebuilding or remanufacturing of machinery and equipment is considered a manufacturing activity and included in other divisions of this section.\n\nRepair and maintenance of goods that are utilized as capital goods as well as consumer goods is typically classified as repair and maintenance of household goods (e.g. office and household furniture repair, see 9524).\n\nAlso included in this division is the specialized installation of machinery. However, the installation of equipment that forms an integral part of buildings or similar structures, such as installation of electrical wiring, installation of escalators or installation of air-conditioning systems, is classified as construction.\n\nThis division excludes the cleaning of industrial machinery (see class 8129) and the repair and maintenance of computers, communications equipment and household goods (see division 95). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'eb4562a9-2265-4c8c-b631-f66e451705bd',
		name: '4322:Plumbing, heat and air-conditioning installation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4322 Description: Plumbing, heat and air-conditioning installation Explanatory Note Inclusion: This class includes the installation of plumbing, heating and air-conditioning systems, including additions, alterations, maintenance and repair.\n\nThis class includes:\n- installation in buildings or other construction projects of:\n* heating systems (electric, gas and oil)\n* furnaces, cooling towers\n* non-electric solar energy collectors\n* plumbing and sanitary equipment\n* ventilation, refrigeration or air-conditioning equipment and ducts\n* gas fittings\n* steam piping\n* fire sprinkler systems\n* lawn sprinkler systems\n- duct work installation Explanatory Note Exclusion: This class excludes:\n- installation of electric baseboard heating, see 4321',
	},
	{
		id: '037d6210-d06b-4f4d-bba9-079c0bc798bf',
		name: '9311:Operation of sports facilities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9311 Description: Operation of sports facilities Explanatory Note Inclusion: This class includes:\n- operation of facilities for indoor or outdoor sports events (open, closed or covered, with or without spectator seating):\n* football, hockey, cricket, baseball, jai-alai stadiums\n* racetracks for auto, dog, horse races\n* swimming pools and stadiums\n* track and field stadiums\n* winter sports arenas and stadiums\n* ice-hockey arenas\n* boxing arenas\n* golf courses\n* bowling lanes\n* fitness centers\n- organization and operation of outdoor or indoor sports events for professionals or amateurs by organizations with own facilities\n\nThis class includes managing and providing the staff to operate these facilities. Explanatory Note Exclusion: This class excludes:\n- renting of recreation and sports equipment, see 7721\n- operation of ski hills, see 9329\n- park and beach activities, see 9329',
	},
	{
		id: '3d7a6e23-4fa2-47fa-b467-4b9a85dae232',
		name: '7220:Research and experimental development on social sciences and humanities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7220 Description: Research and experimental development on social sciences and humanities Explanatory Note Inclusion: This class includes:\n- research and development on social sciences\n- research and development on humanities\n- interdisciplinary research and development, predominantly on social sciences and humanities Explanatory Note Exclusion: This class excludes:\n- market research, see 7320',
	},
	{
		id: '3853ce23-72e8-454f-92a7-d1947ee0773a',
		name: '592:Sound recording and music publishing activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 592 Description: Sound recording and music publishing activities Explanatory Note Inclusion: See class 5920. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7a5477cd-15c5-4c57-a2af-1acf1e4550bb',
		name: '6020:Television programming and broadcasting activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6020 Description: Television programming and broadcasting activities Explanatory Note Inclusion: This class includes:\n- creation of a complete television channel programme, from purchased programme components (e.g. movies, documentaries etc.), self produced programme components (e.g. local news, live reports) or a combination thereof\n\nThis complete television programme can be either broadcast by the producing unit or produced for transmission by third party distributors, such as cable companies or satellite television providers.\nThe programming may be of a general or specialized nature (e.g. limited formats such as news, sports, education or youth oriented programming), may be made freely available to users or may be available only on a subscription basis.\n\nThis class also includes:\n- programming of video-on-demand channels\n- data broadcasting integrated with television broadcasting Explanatory Note Exclusion: This class excludes:\n- production of television programme elements (e.g. movies, documentaries, commercials), see 5911\n- assembly of a package of channels and distribution of that package via cable or satellite to viewers, see division 61',
	},
	{
		id: '97f14df1-6992-4723-b31b-c2c14438f4c2',
		name: '3011:Building of ships and floating structures',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 3011 Description: Building of ships and floating structures Explanatory Note Inclusion: This class includes the building of ships, except vessels for sports or recreation, and the construction of floating structures.\n\nThis class includes:\n- building of commercial vessels:\n* passenger vessels, ferry boats, cargo ships, tankers, tugs etc.\n- building of warships\n- building of fishing boats and fish-processing factory vessels\n\nThis class also includes:\n- building of hovercraft (except recreation-type hovercraft)\n- construction of drilling platforms, floating or submersible\n- construction of floating structures:\n* floating docks, pontoons, coffer-dams, floating landing stages, buoys, floating tanks, barges, lighters, floating cranes, non-recreational inflatable rafts etc.\n- manufacture of sections for ships and floating structures Explanatory Note Exclusion: This class excludes:\n- manufacture of parts of vessels, other than major hull assemblies:\n* manufacture of sails, see 1392\n* manufacture of ships' propellers, see 2599\n* manufacture of iron or steel anchors, see 2599\n* manufacture of marine engines, see 2811\n- manufacture of navigational instruments, see 2651\n- manufacture of lighting equipment for ships, see 2740\n- manufacture of amphibious motor vehicles, see 2910\n- manufacture of inflatable boats or rafts for recreation, see 3012\n- specialized repair and maintenance of ships and floating structures, see 3315\n- ship-breaking, see 3830\n- interior installation of boats, see 4330",
	},
	{
		id: 'f5159771-16b7-422c-91e6-f59751d07de4',
		name: '471:Retail sale in non-specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 471 Description: Retail sale in non-specialized stores Explanatory Note Inclusion: This group includes the retail sale of a variety of product lines in the same unit (non-specialized stores), such as supermarkets or department stores. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2018daf9-e6ae-4051-81e0-a0a1f8df8586',
		name: 'N:Administrative and support service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: N Description: Administrative and support service activities Explanatory Note Inclusion: This section includes a variety of activities that support general business operations. These activities differ from those in section M, since their primary purpose is not the transfer of specialized knowledge. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '72a7862c-8889-4cae-b0ba-9e8f1b3c04f6',
		name: '92:Gambling and betting activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 92 Description: Gambling and betting activities Explanatory Note Inclusion: This division includes the operation of gambling facilities such as casinos, bingo halls and video gaming terminals and the provision of gambling services, such as lotteries and off-track betting. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5f754f23-3c81-420e-a937-1b1797e71781',
		name: '139:Manufacture of other textiles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 139 Description: Manufacture of other textiles Explanatory Note Inclusion: This group includes the manufacture of products produced from textiles, except wearing apparel, such as made-up textile articles, carpets and rugs, rope, narrow woven fabrics, trimmings etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9989417d-3c93-4c62-8199-e5b3b3731764',
		name: '2825:Manufacture of machinery for food, beverage and tobacco processing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2825 Description: Manufacture of machinery for food, beverage and tobacco processing Explanatory Note Inclusion: This class includes:\n- manufacture of agricultural dryers\n- manufacture of machinery for the dairy industry:\n* cream separators\n* milk processing machinery (e.g. homogenizers)\n* milk converting machinery (e.g. butter chums, butter workers and moulding machines)\n* cheese-making machines (e.g. homogenizers, moulders, presses) etc.\n- manufacture of machinery for the grain milling industry:\n* machinery to clean, sort or grade seeds, grain or dried leguminous vegetables (winnowers, sieving belts, separators, grain brushing machines etc.)\n* machinery to produce flour and meal etc. (grinding mills, feeders, sifters, bran cleaners, blenders, rice hullers, pea splitters)\n- manufacture of presses, crushers etc. used to make wine, cider, fruit juices etc.\n- manufacture of machinery for the bakery industry or for making macaroni, spaghetti or similar products:\n* bakery ovens, dough mixers, dough-dividers, moulders, slicers, cake depositing machines etc.\n- manufacture of machines and equipment to process diverse foods:\n* machinery to make confectionery, cocoa or chocolate; to manufacture sugar; for breweries; to process meat or poultry; to prepare fruit, nuts or vegetables; to prepare fish, shellfish or other seafood\n* machinery for filtering and purifying\n* other machinery for the industrial preparation or manufacture of food or drink\n- manufacture of machinery for the extraction or preparation of animal or vegetable fats or oils\n- manufacture of machinery for the preparation of tobacco and for the making of cigarettes or cigars, or for pipe or chewing tobacco or snuff\n- manufacture of machinery for the preparation of food in hotels and restaurants Explanatory Note Exclusion: This class excludes:\n- manufacture of food and milk irradiation equipment, see 2660\n- manufacture of packing, wrapping and weighing machinery, see 2819\n- manufacture of cleaning, sorting or grading machinery for eggs, fruit or other crops (except seeds, grains and dried leguminous vegetables), see 2821',
	},
	{
		id: '5f2ea771-a9d6-4a4c-9148-58f05255d63f',
		name: '352:Manufacture of gas; distribution of gaseous fuels through mains',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 352 Description: Manufacture of gas; distribution of gaseous fuels through mains Explanatory Note Inclusion: See class 3520. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5e736d13-58c6-4fbd-8157-dd6ef35c3f88',
		name: '3822:Treatment and disposal of hazardous waste',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3822 Description: Treatment and disposal of hazardous waste Explanatory Note Inclusion: This class includes the disposal and treatment prior to disposal of solid or non-solid hazardous waste, including waste that is explosive, oxidizing, flammable, toxic, irritant, carcinogenic, corrosive or infectious and other substances and preparations harmful for human health and environment.\n\nThis class includes:\n- operation of facilities for treatment of hazardous waste\n- treatment and disposal of toxic live or dead animals and other contaminated waste\n- incineration of hazardous waste\n- disposal of used goods such as refrigerators to eliminate harmful waste\n- treatment, disposal and storage of radioactive nuclear waste including: \n* treatment and disposal of transition radioactive waste, i.e. decaying within the period of transport, from hospitals\n* encapsulation, preparation and other treatment of nuclear waste for storage Explanatory Note Exclusion: This class excludes:\n- incineration of non-hazardous waste, see 3821\n- decontamination, clean up of land, water; toxic material abatement, see 3900\n- reprocessing of nuclear fuels, see 2011',
	},
	{
		id: 'a108002d-7935-4aa1-a698-9a95e4b421e6',
		name: '1410:Manufacture of wearing apparel, except fur apparel',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 1410 Description: Manufacture of wearing apparel, except fur apparel Explanatory Note Inclusion: This class includes the manufacture of wearing apparel. The material used may be of any kind (see below for exceptions) and may be coated, impregnated or rubberized.\n\nThis class includes:\n- manufacture of wearing apparel made of leather or composition leather, including leather industrial work accessories such as welder's leather aprons\n- manufacture of work wear\n- manufacture of other outerwear made of woven, knitted or crocheted fabric, non-wovens etc. for men, women and children:\n* coats, suits, ensembles, jackets, trousers, skirts etc.\n- manufacture of underwear and nightwear made of woven, knitted or crocheted fabric, lace etc. for men, women and children:\n* shirts, T-shirts, underpants, briefs, pyjamas, nightdresses, dressing gowns, blouses, slips, brassieres, corsets etc.\n- manufacture of babies' garments, tracksuits, ski suits, swimwear etc.\n- manufacture of hats and caps\n- manufacture of other clothing accessories: gloves, belts, shawls, ties, cravats, hairnets etc.\n\nThis class also includes:\n- custom tailoring\n- manufacture of headgear of fur skins\n- manufacture of footwear of textile material without applied soles\n- manufacture of parts of the products listed Explanatory Note Exclusion: This class excludes:\n- manufacture of wearing apparel of fur skins (except headgear), see 1420\n- manufacture of footwear, see 1520\n- manufacture of wearing apparel of rubber or plastics not assembled by stitching but merely sealed together, see 2219, 2220\n- manufacture of leather sports gloves and sports headgear, see 3230\n- manufacture of safety headgear (except sports headgear), see 3290\n- manufacture of fire-resistant and protective safety clothing, see 3290\n- repair of wearing apparel, see 9529",
	},
	{
		id: '0bbdffd2-e8ef-487f-b821-c38db87626ac',
		name: '8521:General secondary education',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8521 Description: General secondary education Explanatory Note Inclusion: This class includes provision of the type of education that lays the foundation for lifelong learning and human development and is capable of furthering education opportunities. Such units provide programmes that are usually on a more subject-oriented pattern using more specialized teachers, and more often employ several teachers conducting classes in their field of specialization. Education can be provided in classrooms or through radio, television broadcast, Internet, correspondence or at home.\nSubject specialization at this level often begins to have some influence even on the educational experience of those pursuing a general programme. Such programmes are designated to qualify students either for technical and vocational education or for entrance to higher education without any special subject prerequisite.\n\nThis class includes:\n- general school education in the first stage of the secondary level corresponding more or less to the period of compulsory school attendance\n- general school education in the second stage of the secondary level giving, in principle, access to higher education\n\nThis class also includes:\n- special education for handicapped students at this level Explanatory Note Exclusion: This class excludes:\n- adult education as defined in group 854',
	},
	{
		id: '61bcfd0a-ab51-42ce-b17c-0aee15c913d7',
		name: '9900:Activities of extraterritorial organizations and bodies',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9900 Description: Activities of extraterritorial organizations and bodies Explanatory Note Inclusion: This class includes:\n- activities of international organizations such as the United Nations and the specialized agencies of the United Nations system, regional bodies etc., the International Monetary Fund, the World Bank, the World Customs Organization, the Organisation for Economic Co-operation and Development, the Organization of Petroleum Exporting Countries, the European Communities, the European Free Trade Association etc.\n\nThis class also includes:\n- activities of diplomatic and consular missions when being determined by the country of their location rather than by the country they represent Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e5b73886-7c44-4690-b255-fdda73165d22',
		name: '43:Specialized construction activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 43 Description: Specialized construction activities Explanatory Note Inclusion: This division includes specialized construction activities (special trades), i.e. the construction of parts of buildings and civil engineering works without responsibility for the entire project. These activities are usually specialized in one aspect common to different structures, requiring specialized skills or equipment, such as pile driving, foundation work, carcass work, concrete work, brick laying, stone setting, scaffolding, roof covering, etc. The erection of steel structures is included, provided that the parts are not produced by the same unit. Specialized construction activities are mostly carried out under subcontract, but especially in repair construction it is done directly for the owner of the property. \n\nAlso included are building finishing and building completion activities.\n\nIncluded is the installation of all kind of utilities that make the construction function as such. These activities are usually performed at the site of the construction, although parts of the job may be carried out in a special shop. Included are activities such as plumbing, installation of heating and air-conditioning systems, antennas, alarm systems and other electrical work, sprinkler systems, elevators and escalators, etc. Also included are insulation work (water, heat, sound), sheet metal work, commercial refrigerating work, the installation of illumination and signalling systems for roads, railways, airports, harbours, etc. Also included is the repair of the same type as the above-mentioned activities.\n\nBuilding completion activities encompass activities that contribute to the completion or finishing of a construction such as glazing, plastering, painting, floor and wall tiling or covering with other materials like parquet, carpets, wallpaper, etc., floor sanding, finish carpentry, acoustical work, cleaning of the exterior, etc. Also included is the repair of the same type as the above-mentioned activities.\n\nThe renting of construction equipment with operator is classified with the associated construction activity. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '15bf16fa-7967-40ab-8ac2-b705c686e77d',
		name: '05:Mining of coal and lignite',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 05 Description: Mining of coal and lignite Explanatory Note Inclusion: This division includes the extraction of solid mineral fuels includes through underground or open-cast mining and includes operations (e.g. grading, cleaning, compressing and other steps necessary for transportation etc.) leading to a marketable product. \n\nThis division does not include coking (see 1910), services incidental to coal or lignite mining (see 0990) or the manufacture of briquettes (see 1920). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a84d0ee4-d77c-4905-b876-3ef60873c763',
		name: '3700:Sewerage',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3700 Description: Sewerage Explanatory Note Inclusion: This class includes:\n- operation of sewer systems or sewer treatment facilities\n- collecting and transporting of human or industrial wastewater from one or several users, as well as rain water by means of sewerage networks, collectors, tanks and other means of transport (sewage vehicles etc.) \n- emptying and cleaning of cesspools and septic tanks, sinks and pits from sewage; servicing of chemical toilets\n- treatment of wastewater (including human and industrial wastewater, water from swimming pools etc.) by means of physical, chemical and biological processes like dilution, screening, filtering, sedimentation etc.\n- maintenance and cleaning of sewers and drains, including sewer rodding Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '864e0bac-6e39-48c5-a119-bff74f5ee82c',
		name: '0121:Growing of grapes',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0121 Description: Growing of grapes Explanatory Note Inclusion: This class includes:\n- growing of wine grapes and table grapes in vineyards Explanatory Note Exclusion: This class excludes:\n- manufacture of wine, see 1102',
	},
	{
		id: '71c0174a-c4e8-47d3-b7f5-73ca0432d96e',
		name: '061:Extraction of crude petroleum',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 061 Description: Extraction of crude petroleum Explanatory Note Inclusion: See class 0610. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '335f8d7b-3b35-4cbe-bcac-b9cf0e28a149',
		name: '5022:Inland freight water transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5022 Description: Inland freight water transport Explanatory Note Inclusion: This class includes:\n- transport of freight via rivers, canals, lakes and other inland waterways, including inside harbours and ports Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8d8458c4-db24-4632-94f5-4b708b9df839',
		name: 'C:Manufacturing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: C Description: Manufacturing Explanatory Note Inclusion: This section includes the physical or chemical transformation of materials, substances, or components into new products, although this cannot be used as the single universal criterion for defining manufacturing (see remark on processing of waste below). The materials, substances, or components transformed are raw materials that are products of agriculture, forestry, fishing, mining or quarrying as well as products of other manufacturing activities. Substantial alteration, renovation or reconstruction of goods is generally considered to be manufacturing.\n\nUnits engaged in manufacturing are often described as plants, factories or mills and characteristically use power-driven machines and materials-handling equipment. However, units that transform materials or substances into new products by hand or in the worker's home and those engaged in selling to the general public of products made on the same premises from which they are sold, such as bakeries and custom tailors, are also included in this section. Manufacturing units may process materials or may contract with other units to process their materials for them. Both types of units are included in manufacturing.\n\nThe output of a manufacturing process may be finished in the sense that it is ready for utilization or consumption, or it may be semi-finished in the sense that it is to become an input for further manufacturing. For example, the output of alumina refining is the input used in the primary production of aluminium; primary aluminium is the input to aluminium wire drawing; and aluminium wire is the input for the manufacture of fabricated wire products.\n\nManufacture of specialized components and parts of, and accessories and attachments to, machinery and equipment is, as a general rule, classified in the same class as the manufacture of the machinery and equipment for which the parts and accessories are intended. Manufacture of unspecialized components and parts of machinery and equipment, e.g. engines, pistons, electric motors, electrical assemblies, valves, gears, roller bearings, is classified in the appropriate class of manufacturing, without regard to the machinery and equipment in which these items may be included. However, making specialized components and accessories by moulding or extruding plastics materials is included in class 2220.\n\nAssembly of the component parts of manufactured products is considered manufacturing. This includes the assembly of manufactured products from either self-produced or purchased components. \n\nThe recovery of waste, i.e. the processing of waste into secondary raw materials is classified in class 3830 (Materials recovery). While this may involve physical or chemical transformations, this is not considered to be a part of manufacturing. The primary purpose of these activities is considered to be the treatment or processing of waste and they are therefore classified in Section E (Water supply; sewerage, waste management and remediation activities). However, the manufacture of new final products (as opposed to secondary raw materials) is classified in manufacturing, even if these processes use waste as an input. For example, the production of silver from film waste is considered to be a manufacturing process.\n\nSpecialized maintenance and repair of industrial, commercial and similar machinery and equipment is, in general, classified in division 33 (Repair, maintenance and installation of machinery and equipment). However, the repair of computers and personal and household goods is classified in division 95 (Repair of computers and personal and household goods), while the repair of motor vehicles is classified in division 45 (Wholesale and retail trade and repair of motor vehicles and motorcycles). \n\nThe installation of machinery and equipment, when carried out as a specialized activity, is classified in 3320. \n\nRemark: The boundaries of manufacturing and the other sectors of the classification system can be somewhat blurry. As a general rule, the activities in the manufacturing section involve the transformation of materials into new products. Their output is a new product. However, the definition of what constitutes a new product can be somewhat subjective. As clarification, the following activities are considered manufacturing in ISIC:\n- milk pasteurizing and bottling (see 1050)\n- fresh fish processing (oyster shucking, fish filleting), not done on a fishing boat (see 1020)\n- printing and related activities (see 1811, 1812)\n- ready-mixed concrete production (see 2395)\n- leather converting (see 1511)\n- wood preserving (see 1610)\n- electroplating, plating, metal heat treating, and polishing (see 2592)\n- rebuilding or remanufacturing of machinery (e.g. automobile engines, see 2910)\n- tyre retreading (see 2211)\n\nConversely, there are activities that, although sometimes involving transformation processes, are classified in other sections of ISIC; in other words, they are not classified as manufacturing. They include:\n- logging, classified in section A (Agriculture, forestry and fishing);\n- beneficiating of agricultural products, classified in section A (Agriculture, forestry and fishing); \n- beneficiating of ores and other minerals, classified in section B (Mining and quarrying); \n- construction of structures and fabricating operations performed at the site of construction, classified in section F (Construction);\n- activities of breaking bulk and redistribution in smaller lots, including packaging, repackaging or bottling of products, such as liquors or chemicals; sorting of scrap; mixing of paints to customers' order; and cutting of metals to customers' order, producing a modified version of the same product, are classified to section G (Wholesale and retail trade; repair of motor vehicles and motorcycles). Explanatory Note Exclusion: [Empty]",
	},
	{
		id: '36838200-0ca7-44fd-9203-8be223ca1d07',
		name: 'Q87-Q88: Social work activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Social work activities',
	},
	{
		id: '82367e94-fae9-4c8c-9ca6-3dcad2562a79',
		name: '2651:Manufacture of measuring, testing, navigating and control equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2651 Description: Manufacture of measuring, testing, navigating and control equipment Explanatory Note Inclusion: This class includes the manufacture of search, detection, navigation, guidance, aeronautical and nautical systems and instruments; automatic controls and regulators for applications, such as heating, air-conditioning, refrigeration and appliances; instruments and devices for measuring, displaying, indicating, recording, transmitting and controlling industrial process variables, such as temperature, humidity, pressure, vacuum, combustion, flow, level, viscosity, density, acidity, concentration and rotation; totalizing (i.e. registering) fluid meters and counting devices; instruments for measuring and testing the characteristics of electricity and electrical signals; instruments and instrumentation systems for laboratory analysis of the chemical or physical composition or concentration of samples of solid, fluid, gaseous or composite material and other measuring and testing instruments and parts thereof.\nThe manufacture of non-electric measuring, testing, navigating and control equipment (except simple mechanical tools) is included here.\n\nThis class includes:\n- manufacture of aircraft engine instruments\n- manufacture of automotive emissions testing equipment\n- manufacture of meteorological instruments\n- manufacture of physical properties testing and inspection equipment\n- manufacture of polygraph machines\n- manufacture of instruments for measuring and testing electricity and electrical signals (including for telecommunications)\n- manufacture of radiation detection and monitoring instruments\n- manufacture of electron and proton microscopes\n- manufacture of surveying instruments\n- manufacture of thermometers liquid-in-glass and bimetal types (except medical)\n- manufacture of humidistats\n- manufacture of hydronic limit controls\n- manufacture of flame and burner control\n- manufacture of spectrometers\n- manufacture of pneumatic gauges\n- manufacture of consumption meters (e.g. water, gas)\n- manufacture of flow meters and counting devices \n- manufacture of tally counters\n- manufacture of mine detectors, pulse (signal) generators; metal detectors\n- manufacture of search, detection, navigation, aeronautical and nautical equipment, including sonobuoys\n- manufacture of radar equipment\n- manufacture of GPS devices\n- manufacture of environmental controls and automatic controls for appliances\n- manufacture of measuring and recording equipment (e.g. flight recorders)\n- manufacture of motion detectors\n- manufacture of laboratory analytical instruments (e.g. blood analysis equipment) \n- manufacture of laboratory scales, balances, incubators, and miscellaneous laboratory apparatus for measuring, testing, etc. Explanatory Note Exclusion: This class excludes:\n- manufacture of telephone answering machines, see 2630\n- manufacture of irradiation equipment, see 2660\n- manufacture of optical measuring and checking devices and instruments (e.g. fire control equipment, photographic light meters, range finders), see 2670\n- manufacture of optical positioning equipment, see 2670\n- manufacture of dictating machines, see 2817\n- manufacture of levels, tape measures and similar hand tools, machinists\u2019 precision tools, see 2819\n- manufacture of medical thermometers, see 3250\n- installation of industrial process control equipment, see 3320',
	},
	{
		id: '975f7960-2647-46fd-8fe5-a1efc313edc3',
		name: '015:Mixed farming',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 015 Description: Mixed farming Explanatory Note Inclusion: See class 0150. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8acd74f6-904a-4377-bf12-ab98f4f4bd7c',
		name: '267:Manufacture of optical instruments and photographic equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 267 Description: Manufacture of optical instruments and photographic equipment Explanatory Note Inclusion: See class 2670. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '357e03b0-db78-40d6-b5f8-6ef2c62afbb8',
		name: '66:Activities auxiliary to financial service and insurance activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 66 Description: Activities auxiliary to financial service and insurance activities Explanatory Note Inclusion: This division includes the provision of services involved in or closely related to financial service activities, but not themselves providing financial services. The primary breakdown of this division is according to the type of financial transaction or funding served. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '639df68d-ce83-4cc4-8c97-af68527f0bf8',
		name: '2100:Manufacture of pharmaceuticals, medicinal chemical and botanical products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2100 Description: Manufacture of pharmaceuticals, medicinal chemical and botanical products Explanatory Note Inclusion: This class includes:\n- manufacture of medicinal active substances to be used for their pharmacological properties in the manufacture of medicaments: antibiotics, basic vitamins, salicylic and O-acetylsalicylic acids etc.\n- processing of blood\n- manufacture of medicaments:\n* antisera and other blood fractions\n* vaccines\n* diverse medicaments, including homeopathic preparations\n- manufacture of chemical contraceptive products for external use and hormonal contraceptive medicaments\n- manufacture of medical diagnostic preparations, including pregnancy tests\n- manufacture of radioactive in-vivo diagnostic substances\n- manufacture of biotech pharmaceuticals\n\nThis class also includes:\n- manufacture of chemically pure sugars\n- processing of glands and manufacture of extracts of glands etc.\n- manufacture of medical impregnated wadding, gauze, bandages, dressings etc.\n- preparation of botanical products (grinding, grading, milling) for pharmaceutical use Explanatory Note Exclusion: This class excludes:\n- manufacture of herb infusions (mint, vervain, chamomile etc.), see 1079\n- manufacture of dental fillings and dental cement, see 3250\n- manufacture of bone reconstruction cements, see 3250\n- wholesale of pharmaceuticals, see 4649\n- retail sale of pharmaceuticals, see 4772\n- research and development for pharmaceuticals and biotech pharmaceuticals, see 7210\n- packaging of pharmaceuticals, see 8292',
	},
	{
		id: '30e53c0e-8942-4675-817b-cb08704a8436',
		name: '310:Manufacture of furniture',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 310 Description: Manufacture of furniture Explanatory Note Inclusion: See class 3100. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4c1e2b0e-ae43-495b-9f5c-01a5375bbb01',
		name: '73:Advertising and market research',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 73 Description: Advertising and market research Explanatory Note Inclusion: This division includes the creation of advertising campaigns and placement of such advertising in periodicals, newspapers, radio and television, or other media as well as the design of display structures and sites. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e5db3257-7cac-4232-a049-eabf29122bf4',
		name: '02:Forestry and logging',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 02 Description: Forestry and logging Explanatory Note Inclusion: This division includes the production of roundwood for the forest-based manufacturing industries (ISIC divisions 16 and 17) as well as the extraction and gathering of wild growing non-wood forest products. Besides the production of timber, forestry activities result in products that undergo little processing, such as fire wood, charcoal, wood chips and roundwood used in an unprocessed form (e.g. pit-props, pulpwood etc.). These activities can be carried out in natural or planted forests. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f3c8ba14-4559-46fb-ab73-45f0eee3ce28',
		name: '131:Spinning, weaving and finishing of textiles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 131 Description: Spinning, weaving and finishing of textiles Explanatory Note Inclusion: This group includes the manufacture of textiles, including preparatory operations, the spinning of textile fibres and the weaving of textiles. This can be done from varying raw materials, such as silk, wool, other animal, vegetable or man-made fibres, paper or glass etc.\nAlso included in this group is the finishing of textiles and wearing apparel, i.e. bleaching, dyeing, dressing and similar activities. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '38dfca1a-12a8-4f25-bbba-5b26bc91dd36',
		name: '03:Fishing and aquaculture',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 03 Description: Fishing and aquaculture Explanatory Note Inclusion: This division includes capture fishery and aquaculture, covering the use of fishery resources from marine, brackish or freshwater environments, with the goal of capturing or gathering fish, crustaceans, molluscs and other marine organisms and products (e.g. aquatic plants, pearls, sponges etc).\nAlso included are activities that are normally integrated in the process of production for own account (e.g. seeding oysters for pearl production).\n\nThis division does not include building and repairing of ships and boats (3011, 3315) and sport or recreational fishing activities (9319). Processing of fish, crustaceans or molluscs is excluded, whether at land-based plants or on factory ships (1020). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '81b7f5f1-12cb-45a4-b682-00f5cd0b97e9',
		name: '7210:Research and experimental development on natural sciences and engineering',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7210 Description: Research and experimental development on natural sciences and engineering Explanatory Note Inclusion: This class includes:\n- research and experimental development on natural science and engineering:\n* research and development on natural sciences\n* research and development on engineering and technology\n* research and development on medical sciences\n* research and development on biotechnology\n* research and development on agricultural sciences\n* interdisciplinary research and development, predominantly on natural sciences and engineering Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd06f015c-e7bd-48d6-a28d-29a8301776db',
		name: '1393:Manufacture of carpets and rugs',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1393 Description: Manufacture of carpets and rugs Explanatory Note Inclusion: This class includes:\n- manufacture of textile floor coverings:\n* carpets, rugs and mats, tiles\n\nThis class also includes:\n- manufacture of needle-loom felt floor coverings Explanatory Note Exclusion: This class excludes:\n- manufacture of mats and matting of plaiting materials, see 1629\n- manufacture of floor coverings of cork, see 1629\n- manufacture of resilient floor coverings, such as vinyl, linoleum, see 2220',
	},
	{
		id: 'b9716e4b-7d4f-488b-80b7-5eb859594d10',
		name: '96:Other personal service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 96 Description: Other personal service activities Explanatory Note Inclusion: This division includes all service activities not mentioned elsewhere in the classification. Notably it includes types of services such as washing and (dry-)cleaning of textiles and fur products, hairdressing and other beauty treatment, funeral and related activities. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a7bb8e3a-3d68-4665-9ba2-cb4ae3c1eee7',
		name: '4782:Retail sale via stalls and markets of textiles, clothing and footwear',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4782 Description: Retail sale via stalls and markets of textiles, clothing and footwear Explanatory Note Inclusion: This class includes:\n- retail sale of textiles, clothing and footwear via stalls or markets Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '3c034e81-0345-466c-b696-9b50d0d240fe',
		name: '9103:Botanical and zoological gardens and nature reserves activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 9103 Description: Botanical and zoological gardens and nature reserves activities Explanatory Note Inclusion: This class includes:\n- operation of botanical and zoological gardens, including children's zoos\n- operation of nature reserves, including wildlife preservation, etc. Explanatory Note Exclusion: This class excludes:\n- landscape and gardening services, see 8130\n- operation of sport fishing and hunting preserves, see 9319",
	},
	{
		id: 'c9fae7df-d70c-4963-98b5-4eea25ceb727',
		name: '2599:Manufacture of other fabricated metal products n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2599 Description: Manufacture of other fabricated metal products n.e.c. Explanatory Note Inclusion: This class includes:\n- manufacture of pails, cans, drums, buckets, boxes\n- manufacture of tins and cans for food products, collapsible tubes and boxes\n- manufacture of metallic closures\n- manufacture of metal cable, plaited bands and similar articles\n- manufacture of uninsulated metal cable or insulated cable not capable of being used as a conductor of electricity\n- manufacture of articles made of wire: barbed wire, wire fencing, grill, netting, cloth etc.\n- manufacture of nails and pins\n- manufacture of rivets, washers and similar non-threaded products\n- manufacture of screw machine products\n- manufacture of bolts, screws, nuts and similar threaded products\n- manufacture of springs (except watch springs):\n* leaf springs, helical springs, torsion bar springs\n* leaves for springs\n- manufacture of chain, except power transmission chain\n- manufacture of metal household articles:\n* flatware: plates, saucers etc.\n* hollowware: pots, kettles etc.\n* dinnerware: bowls, platters etc.\n* saucepans, frying pans and other non-electrical utensils for use at the table or in the kitchen\n* small hand-operated kitchen appliances and accessories\n* metal scouring pads\n- manufacture of baths, sinks, washbasins and similar articles\n- manufacture of metal goods for office use, except furniture\n- manufacture of safes, strongboxes, armoured doors etc.\n- manufacture of various metal articles:\n* ship propellers and blades thereof\n* anchors\n* bells\n* assembled railway track fixtures\n* clasps, buckles, hooks\n- manufacture of foil bags\n- manufacture of permanent metallic magnets\n- manufacture of metal vacuum jugs and bottles\n- manufacture of metal signs (non-electrical)\n- manufacture of metal badges and metal military insignia\n- manufacture of metal hair curlers, metal umbrella handles and frames, combs Explanatory Note Exclusion: This class excludes:\n- manufacture of ceramic and ferrite magnets, see 2393\n- manufacture of tanks and reservoirs, see 2512\n- manufacture of swords, bayonets, see 2593\n- manufacture of clock or watch springs, see 2652\n- manufacture of wire and cable for electricity transmission, see 2732\n- manufacture of power transmission chain, see 2814\n- manufacture of shopping carts, see 3099\n- manufacture of metal furniture, see 3100\n- manufacture of sports goods, see 3230\n- manufacture of games and toys, see 3240',
	},
	{
		id: '05e3dab5-b792-460a-baa8-9efba4b33701',
		name: 'C13-C15: Manufacture of textiles, wearing apparel and leather products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Manufacture of textiles, wearing apparel and leather products',
	},
	{
		id: '20ba4f22-afa7-42d0-b76f-eb13853169b4',
		name: '2511:Manufacture of structural metal products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2511 Description: Manufacture of structural metal products Explanatory Note Inclusion: This class includes:\n- manufacture of metal frameworks or skeletons for construction and parts thereof (towers, masts, trusses, bridges etc.)\n- manufacture of industrial frameworks in metal (frameworks for blast furnaces, lifting and handling equipment etc.)\n- manufacture of prefabricated buildings mainly of metal:\n* site huts, modular exhibition elements etc.\n- manufacture of metal doors, windows and their frames, shutters and gates\n- metal room partitions for floor attachment Explanatory Note Exclusion: This class excludes:\n- manufacture of parts for marine or power boilers, see 2513\n- manufacture of assembled railway track fixtures, see 2599\n- manufacture of sections of ships, see 3011',
	},
	{
		id: '980f3246-835e-49eb-a2f4-1d506f17b744',
		name: '8810:Social work activities without accommodation for the elderly and disabled',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8810 Description: Social work activities without accommodation for the elderly and disabled Explanatory Note Inclusion: This class includes:\n- social, counselling, welfare, referral and similar services which are aimed at the elderly and disabled in their homes or elsewhere and carried out by public or by private organizations, national or local self-help organizations and by specialists providing counselling services:\n* visiting of the elderly and disabled\n* day-care activities for the elderly or for handicapped adults\n* vocational rehabilitation and habilitation activities for disabled persons provided that the education component is limited Explanatory Note Exclusion: This class excludes:\n- funding and administration of compulsory social security programmes, see 8430\n- activities similar to those described in this class, but including accommodation, see 8730\n- day-care activities for handicapped children, see 8890',
	},
	{
		id: 'c8ada55a-8ead-4cb3-946f-6f81e70e3a36',
		name: '263:Manufacture of communication equipment',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 263 Description: Manufacture of communication equipment Explanatory Note Inclusion: See class 2630. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9261e881-fb20-4c3a-ab54-03a8656f2329',
		name: '1430:Manufacture of knitted and crocheted apparel',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1430 Description: Manufacture of knitted and crocheted apparel Explanatory Note Inclusion: This class includes:\n- manufacture of knitted or crocheted wearing apparel and other made-up articles directly into shape: pullovers, cardigans, jerseys, waistcoats and similar articles\n- manufacture of hosiery, including socks, tights and pantyhose Explanatory Note Exclusion: This class excludes:\n- manufacture of knitted and crocheted fabrics, see 1391',
	},
	{
		id: 'a58ba680-cb84-4107-8837-b277c0333d76',
		name: '474:Retail sale of information and communications equipment in specialized store',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 474 Description: Retail sale of information and communications equipment in specialized stores Explanatory Note Inclusion: This group includes the retail sale of information and communications equipment, such as computers and peripheral equipment, telecommunications equipment and consumer electronics, by specialized stores. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f8ee838c-b10f-43d8-b304-0a8384dbbb15',
		name: '421:Construction of roads and railways',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 421 Description: Construction of roads and railways Explanatory Note Inclusion: See class 4210. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd1099763-6c97-4a47-90f2-b6d20475ac7e',
		name: '1073:Manufacture of cocoa, chocolate and sugar confectionery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1073 Description: Manufacture of cocoa, chocolate and sugar confectionery Explanatory Note Inclusion: This class includes:\n- manufacture of cocoa, cocoa butter, cocoa fat, cocoa oil\n- manufacture of chocolate and chocolate confectionery\n- manufacture of sugar confectionery: caramels, cachous, nougats, fondant, white chocolate\n- manufacture of chewing gum\n- preserving in sugar of fruit, nuts, fruit peels and other parts of plants\n- manufacture of confectionery lozenges and pastilles Explanatory Note Exclusion: This class excludes:\n- manufacture of sucrose sugar, see 1072',
	},
	{
		id: 'fd89bd9b-c7d1-4723-9a7e-87a345dcd46a',
		name: '3250:Manufacture of medical and dental instruments and supplies',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 3250 Description: Manufacture of medical and dental instruments and supplies Explanatory Note Inclusion: This class includes the manufacture of laboratory apparatus, surgical and medical instruments, surgical appliances and supplies, dental equipment and supplies, orthodontic goods, dentures and orthodontic appliances. Included is the manufacture of medical, dental and similar furniture, where the additional specific functions determine the purpose of the product, such as dentist's chairs with built-in hydraulic functions.\n\nThis class includes:\n- manufacture of surgical drapes and sterile string and tissue\n- manufacture of dental fillings and cements (except denture adhesives), dental wax and other dental plaster preparations\n- manufacture of bone reconstruction cements\n- manufacture of dental laboratory furnaces\n- manufacture of laboratory ultrasonic cleaning machinery\n- manufacture of laboratory sterilizers\n- manufacture of laboratory type distilling apparatus, laboratory centrifuges\n- manufacture of medical, surgical, dental or veterinary furniture, such as:\n* operating tables\n* examination tables\n* hospital beds with mechanical fittings\n* dentists' chairs\n- manufacture of bone plates and screws, syringes, needles, catheters, cannulae, etc.\n- manufacture of dental instruments (including dentists' chairs incorporating dental equipment)\n- manufacture of artificial teeth, bridges, etc., made in dental labs\n- manufacture of orthopedic and prosthetic devices\n- manufacture of glass eyes\n- manufacture of medical thermometers\n- manufacture of ophthalmic goods, eyeglasses, sunglasses, lenses ground to prescription, contact lenses, safety goggles Explanatory Note Exclusion: This class excludes:\n- manufacture of denture adhesives, see 2023\n- manufacture of medical impregnated wadding, dressings etc., see 2100\n- manufacture of electromedical and electrotherapeutic equipment, see 2660\n- manufacture of wheelchairs, see 3092",
	},
	{
		id: 'e52c0d65-4fbd-46fa-9b41-af4307b6cfdf',
		name: '5222:Service activities incidental to water transportation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5222 Description: Service activities incidental to water transportation Explanatory Note Inclusion: This class includes:\n- activities related to water transport of passengers, animals or freight:\n* operation of terminal facilities such as harbours and piers\n* operation of waterway locks etc.\n* navigation, pilotage and berthing activities\n* lighterage, salvage activities\n* lighthouse activities Explanatory Note Exclusion: This class excludes:\n- cargo handling, see 5224\n- operation of marinas, see 9329',
	},
	{
		id: '95e9a845-7367-4775-8ed4-249bb0588193',
		name: '2811:Manufacture of engines and turbines, except aircraft, vehicle and cycle eng',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2811 Description: Manufacture of engines and turbines, except aircraft, vehicle and cycle engines Explanatory Note Inclusion: This class includes:\n- manufacture of internal combustion piston engines, except motor vehicle, aircraft and cycle propulsion engines:\n* marine engines\n* railway engines\n- manufacture of pistons, piston rings, carburetors and such for all internal combustion engines, diesel engines etc.\n- manufacture of inlet and exhaust valves of internal combustion engines\n- manufacture of turbines and parts thereof:\n* steam turbines and other vapour turbines\n* hydraulic turbines, waterwheels and regulators thereof\n* wind turbines\n* gas turbines, except turbojets or turbo propellers for aircraft propulsion \n- manufacture of boiler-turbine sets\n- manufacture of turbine-generator sets Explanatory Note Exclusion: This class excludes:\n- manufacture of electric generators (except turbine generator sets), see 2710\n- manufacture of prime mover generator sets (except turbine generator sets), see 2710\n- manufacture of electrical equipment and components of internal combustion engines, see 2790\n- manufacture of motor vehicle, aircraft or cycle propulsion engines, see 2910, 3030, 3091\n- manufacture of turbojets and turbo propellers, see 3030',
	},
	{
		id: '606587d2-45f8-48c8-8957-6e060bf4ab5f',
		name: 'C10-C12: Manufacture of food products, beverages and tobacco products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Manufacture of food products, beverages and tobacco products',
	},
	{
		id: 'c1bedde9-9c78-46f6-8e94-70a7417c7df2',
		name: '5224:Cargo handling',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 5224 Description: Cargo handling Explanatory Note Inclusion: This class includes:\n- loading and unloading of goods or passengers' luggage irrespective of the mode of transport used for transportation\n- stevedoring\n- loading and unloading of freight railway cars Explanatory Note Exclusion: This class excludes:\n- operation of terminal facilities, see 5221, 5222 and 5223",
	},
	{
		id: '9731f70c-5ade-47d7-97e8-12805659b6e8',
		name: '531:Postal activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 531 Description: Postal activities Explanatory Note Inclusion: See class 5310. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '14e53271-df50-4f96-b7d4-913ebd93cbc9',
		name: '031:Fishing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 031 Description: Fishing Explanatory Note Inclusion: This group includes capture fishery, i.e. the hunting, collecting and gathering activities directed at removing or collecting live wild aquatic organisms (predominantly fish, molluscs and crustaceans) including plants from the oceanic, coastal or inland waters for human consumption and other purposes by hand or more usually by various types of fishing gear such as nets, lines and stationary traps. Such activities can be conducted on the intertidal shoreline (e.g. collection of molluscs such as mussels and oysters) or shore based netting, or from home-made dugouts or more commonly using commercially made boats in inshore, coastal waters or offshore waters. Unlike in aquaculture (group 032), the aquatic resource being captured is usually common property resource irrespective of whether the harvest from this resource is undertaken with or without exploitation rights. Such activities also include fishing restocked water bodies. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'cd20b2ff-8749-4c50-874c-2c9e91a56aac',
		name: '4659:Wholesale of other machinery and equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4659 Description: Wholesale of other machinery and equipment Explanatory Note Inclusion: This class includes:\n- wholesale of office machinery and equipment, except computers and computer peripheral equipment\n- wholesale of office furniture\n- wholesale of transport equipment except motor vehicles, motorcycles and bicycles\n- wholesale of production-line robots\n- wholesale of wires and switches and other installation equipment for industrial use\n- wholesale of other electrical material such as electrical motors, transformers\n- wholesale of machine tools of any type and for any material\n- wholesale of other machinery n.e.c. for use in industry, trade and navigation and other services\n\nThis class also includes:\n- wholesale of computer-controlled machine tools\n- wholesale of computer-controlled machinery for the textile industry and of computer-controlled sewing and knitting machines\n- wholesale of measuring instruments and equipment Explanatory Note Exclusion: This class excludes:\n- wholesale of motor vehicles, trailers and caravans, see 4510\n- wholesale of motor vehicle parts, see 4530\n- wholesale of motorcycles, see 4540\n- wholesale of bicycles, see 4649\n- wholesale of computers and peripheral equipment, see 4651\n- wholesale of electronic parts and telephone and communications equipment, see 4652',
	},
	{
		id: '0bef4135-5b56-4012-a812-b78c9a8218a9',
		name: '1920:Manufacture of refined petroleum products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1920 Description: Manufacture of refined petroleum products Explanatory Note Inclusion: This class includes the manufacture of liquid or gaseous fuels or other products from crude petroleum, bituminous minerals or their fractionation products. Petroleum refining involves one or more of the following activities: fractionation, straight distillation of crude oil, and cracking.\n\nThis class includes:\n- production of motor fuel: gasoline, kerosene etc.\n- production of fuel: light, medium and heavy fuel oil, refinery gases such as ethane, propane, butane etc.\n- manufacture of oil-based lubricating oils or greases, including from waste oil\n- manufacture of products for the petrochemical industry and for the manufacture of road coverings\n- manufacture of various products: white spirit, Vaseline, paraffin wax, petroleum jelly etc.\n- manufacture of hard-coal and lignite fuel briquettes\n- manufacture of petroleum briquettes\n- blending of biofuels, i.e. blending of alcohols with petroleum (e.g. gasohol) Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '019f3bcc-4956-4e95-9db3-ae24a3b9ba6c',
		name: '105:Manufacture of dairy products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 105 Description: Manufacture of dairy products Explanatory Note Inclusion: See class 1050. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'dfe775f9-34df-456c-9987-166eee72db70',
		name: 'J59-J60: Motion picture, video and television programme production, sound recording and music publishing activities; p',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Motion picture, video and television programme production, sound recording and music publishing activities; programming and broadcasting activities',
	},
	{
		id: 'e4b2ed6d-ec0a-4263-8964-ca6287fe68e1',
		name: '2930:Manufacture of parts and accessories for motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2930 Description: Manufacture of parts and accessories for motor vehicles Explanatory Note Inclusion: This class includes:\n- manufacture of diverse parts and accessories for motor vehicles:\n* brakes, gearboxes, axles, road wheels, suspension shock absorbers, radiators, silencers, exhaust pipes, catalytic converters, clutches, steering wheels, steering columns and steering boxes\n- manufacture of parts and accessories of bodies for motor vehicles:\n* safety belts, airbags, doors, bumpers\n- manufacture of car seats\n- manufacture of motor vehicle electrical equipment, such as generators, alternators, spark plugs, ignition wiring harnesses, power window and door systems, assembly of purchased gauges into instrument panels, voltage regulators, etc. Explanatory Note Exclusion: This class excludes:\n- manufacture of tyres, see 2211\n- manufacture of rubber hoses and belts and other rubber products, see 2219\n- manufacture of plastic hoses and belts and other plastic products, see 2220\n- manufacture of batteries for vehicles, see 2720\n- manufacture of lighting equipment for motor vehicles, see 2740\n- manufacture of pistons, piston rings and carburetors, see 2811\n- manufacture of pumps for motor vehicles and engines, see 2813\n- maintenance, repair and alteration of motor vehicles, see 4520',
	},
	{
		id: '1d54ab7d-c743-4ec0-a961-48c367c70f3a',
		name: '492:Other land transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 492 Description: Other land transport Explanatory Note Inclusion: This group includes all land-based transport activities other than rail transport. However, rail transport as part of urban or suburban transport systems is included here. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ed356ceb-dd77-4dfd-944c-5b53bbfedeef',
		name: '32:Other manufacturing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 32 Description: Other manufacturing Explanatory Note Inclusion: This division includes the manufacture of a variety of goods not covered in other parts of the classification. Since this is a residual division, production processes, input materials and use of the produced goods can vary widely and usual criteria for grouping classes into divisions have not been applied here. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'eb91fd72-1c4f-4c26-a032-5efb1611e1f1',
		name: '3211:Manufacture of jewellery and related articles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 3211 Description: Manufacture of jewellery and related articles Explanatory Note Inclusion: This class includes:\n- production of worked pearls\n- production of precious and semi-precious stones in the worked state, including the working of industrial quality stones and synthetic or reconstructed precious or semi-precious stones\n- working of diamonds\n- manufacture of jewellery of precious metal or of base metals clad with precious metals, or precious or semi-precious stones, or of combinations of precious metal and precious or semi-precious stones or of other materials\n- manufacture of goldsmiths' articles of precious metals or of base metals clad with precious metals:\n* dinnerware, flatware, hollowware, toilet articles, office or desk articles, articles for religious use etc.\n- manufacture of technical or laboratory articles of precious metal (except instruments and parts thereof): crucibles, spatulas, electroplating anodes etc.\n- manufacture of precious metal watch bands, wristbands, watch straps and cigarette cases\n- manufacture of coins, including coins for use as legal tender, whether or not of precious metal\n\nThis class also includes:\n- engraving of personal precious and non-precious metal products Explanatory Note Exclusion: This class excludes:\n- manufacture of non-metal watch bands (fabric, leather, plastic etc.), see 1512\n- manufacture of articles of base metal plated with precious metal (except imitation jewellery), see division 25\n- manufacture of watchcases, see 2652\n- manufacture of (non-precious) metal watch bands, see 3212\n- manufacture of imitation jewellery, see 3212",
	},
	{
		id: 'ca16761f-7ced-436d-b39a-3e59f5fbd315',
		name: '353:Steam and air conditioning supply',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 353 Description: Steam and air conditioning supply Explanatory Note Inclusion: See class 3530. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '852cb3e2-1ed4-400e-a8bf-9fbcc3a1b220',
		name: '8010:Private security activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8010 Description: Private security activities Explanatory Note Inclusion: This class includes the provision of one or more of the following: guard and patrol services, picking up and delivering money, receipts or other valuable items with personnel and equipment to protect such properties while in transit.\n\nThis class includes:\n- armored car services\n- bodyguard services\n- polygraph services\n- fingerprinting services\n- security guard services Explanatory Note Exclusion: This class excludes:\n- public order and safety activities, see 8423',
	},
	{
		id: 'aca9a5b1-09d8-48c1-9008-8ff92e32dca7',
		name: '512:Freight air transport',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 512 Description: Freight air transport Explanatory Note Inclusion: See class 5120. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a4ba9f33-966c-429f-8f26-4c061950f7f2',
		name: '13:Manufacture of textiles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 13 Description: Manufacture of textiles Explanatory Note Inclusion: This division includes preparation and spinning of textile fibres as well as textile weaving, finishing of textiles and wearing apparel, manufacture of made-up textile articles, except apparel (e.g. household linen, blankets, rugs, cordage etc.). Growing of natural fibres is covered under division 01, while manufacture of synthetic fibres is a chemical process classified in class 2030. Manufacture of wearing apparel is covered in division 14. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'beeda552-2933-4ba8-965b-7b7e88d97511',
		name: '0892:Extraction of peat',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0892 Description: Extraction of peat Explanatory Note Inclusion: This class includes:\n- peat digging\n- peat agglomeration\n- preparation of peat to improve quality or facilitate transport or storage Explanatory Note Exclusion: This class excludes:\n- service activities incidental to peat mining, see 0990\n- manufacture of articles of peat, see 2399',
	},
	{
		id: 'ba3a38bb-cefc-4723-9f8b-504385b661b5',
		name: '732:Market research and public opinion polling',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 732 Description: Market research and public opinion polling Explanatory Note Inclusion: See class 7320. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '94c3a1cb-14f7-49ed-bd10-a7044866f9fe',
		name: '2824:Manufacture of machinery for mining, quarrying and construction',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2824 Description: Manufacture of machinery for mining, quarrying and construction Explanatory Note Inclusion: This class includes:\n- manufacture of continuous-action elevators and conveyors for underground use\n- manufacture of boring, cutting, sinking and tunnelling machinery (whether or not for underground use)\n- manufacture of machinery for treating minerals by screening, sorting, separating, washing, crushing etc.\n- manufacture of concrete and mortar mixers\n- manufacture of earth-moving machinery:\n* bulldozers, angle-dozers, graders, scrapers, levellers, mechanical shovels, shovel loaders etc.\n- manufacture of pile drivers and pile extractors, mortar spreaders, bitumen spreaders, concrete surfacing machinery etc.\n- manufacture of tracklaying tractors and tractors used in construction or mining\n- manufacture of bulldozer and angle-dozer blades\n- manufacture of off-road dumping trucks Explanatory Note Exclusion: This class excludes:\n- manufacture of lifting and handling equipment, see 2816\n- manufacture of other tractors, see 2821, 2910\n- manufacture of machine tools for working stone, including machines for splitting or clearing stone, see 2822\n- manufacture of concrete-mixer lorries, see 2910\n- manufacture of mining locomotives and mining rail cars, see 3020',
	},
	{
		id: '6223e62d-867c-4515-ade1-9133338a8481',
		name: '4530:Sale of motor vehicle parts and accessories',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4530 Description: Sale of motor vehicle parts and accessories Explanatory Note Inclusion: This class includes:\n- wholesale and retail sale of all kinds of parts, components, supplies, tools and accessories for motor vehicles, such as:\n* rubber tires and inner tubes for tires\n* spark plugs, batteries, lighting equipment and electrical parts Explanatory Note Exclusion: This class excludes:\n- retail sale of automotive fuel, see 4730',
	},
	{
		id: '0783fec2-42b8-41e0-9944-cdba0fe68601',
		name: '4923:Freight transport by road',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4923 Description: Freight transport by road Explanatory Note Inclusion: This class includes:\n- all freight transport operations by road:\n* logging haulage\n* stock haulage\n* refrigerated haulage\n* heavy haulage\n* bulk haulage, including haulage in tanker trucks\n* haulage of automobiles\n* transport of waste and waste materials, without collection or disposal\n\nThis class also includes:\n- furniture removal\n- renting of trucks with driver\n- freight transport by man or animal-drawn vehicles Explanatory Note Exclusion: This class excludes:\n- log hauling within the forest, as part of logging operations, see 0240\n- distribution of water by trucks, see 3600\n- operation of terminal facilities for handling freight, see 5221\n- crating and packing services for transport, see 5229\n- post and courier activities, see 5310, 5320\n- waste transport as integrated part of waste collection activities, see 3811, 3812',
	},
	{
		id: 'dc90b1a3-15ce-4d0a-a406-1809cdcfac89',
		name: 'B:Mining and quarrying',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: B Description: Mining and quarrying Explanatory Note Inclusion: This section includes the extraction of minerals occurring naturally as solids (coal and ores), liquids (petroleum) or gases (natural gas). Extraction can be achieved by different methods such as underground or surface mining, well operation, seabed mining etc.\nThis section also includes supplementary activities aimed at preparing the crude materials for marketing, for example, crushing, grinding, cleaning, drying, sorting, concentrating ores, liquefaction of natural gas and agglomeration of solid fuels. These operations are often carried out by the units that extracted the resource and/or others located nearby.\nMining activities are classified into divisions, groups and classes on the basis of the principal mineral produced. Divisions 05, 06 are concerned with mining and quarrying of fossil fuels (coal, lignite, petroleum, gas); divisions 07, 08 concern metal ores, various minerals and quarry products. \nSome of the technical operations of this section, particularly related to the extraction of hydrocarbons, may also be carried out for third parties by specialized units as an industrial service, which is reflected in division 09. \n\nThis section excludes the processing of the extracted materials (see section C - Manufacturing), which also covers the bottling of natural spring and mineral waters at springs and wells (see class 1104) or the crushing, grinding or otherwise treating certain earths, rocks and minerals not carried out in conjunction with mining and quarrying (see class 2399). This section also excludes the usage of the extracted materials without a further transformation for construction purposes (see section F - Construction), the collection, purification and distribution of water (see class 3600), separate site preparation activities for mining (see class 4312) and geophysical, geologic and seismic surveying activities (see class 7110). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e3e81ccc-c051-4896-9f5d-eb0340ca77e6',
		name: '620:Computer programming, consultancy and related activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 620 Description: Computer programming, consultancy and related activities Explanatory Note Inclusion: See division 62. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7ca8ce16-639b-4a18-b839-e646ff61f0a9',
		name: '619:Other telecommunications activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 619 Description: Other telecommunications activities Explanatory Note Inclusion: See class 6190. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'de87d706-4cf2-4978-8e4a-afe58ff8f11e',
		name: '8422:Defence activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8422 Description: Defence activities Explanatory Note Inclusion: This class includes:\n- administration, supervision and operation of military defence affairs and land, sea, air and space defence forces such as:\n* combat forces of army, navy and air force\n* engineering, transport, communications, intelligence, material, personnel and other non-combat forces and commands\n* reserve and auxiliary forces of the defence establishment\n* military logistics (provision of equipment, structures, supplies etc.)\n* health activities for military personnel in the field\n- administration, operation and support of civil defence forces\n- support for the working out of contingency plans and the carrying out of exercises in which civilian institutions and populations are involved\n- administration of defence-related R&D policies and related funds Explanatory Note Exclusion: This class excludes:\n- research and experimental development activities, see division 72\n- provision of military aid to foreign countries, see 8421\n- activities of military tribunals, see 8423 \n- provision of supplies for domestic emergency use in case of peacetime disasters, see 8423 \n- educational activities of military schools, colleges and academies, see 8530\n- activities of military hospitals, see 8610',
	},
	{
		id: '549573d9-d6f0-4cc6-a6cf-647a418e456f',
		name: '52:Warehousing and support activities for transportation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 52 Description: Warehousing and support activities for transportation Explanatory Note Inclusion: This division includes warehousing and support activities for transportation, such as operating of transport infrastructure (e.g. airports, harbours, tunnels, bridges, etc.), the activities of transport agencies and cargo handling. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '71cbd537-de53-4eae-b5fb-5e4c3b6243f6',
		name: '65:Insurance, reinsurance and pension funding, except compulsory social security',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 65 Description: Insurance, reinsurance and pension funding, except compulsory social security Explanatory Note Inclusion: This division includes the underwriting annuities and insurance policies and investing premiums to build up a portfolio of financial assets to be used against future claims. Provision of direct insurance and reinsurance are included. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '544fd14d-6283-4a91-b357-07934b21d694',
		name: '8211:Combined office administrative service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8211 Description: Combined office administrative service activities Explanatory Note Inclusion: This class includes:\n- provision of a combination of day-to-day office administrative services, such as reception, financial planning, billing and record keeping, personnel and physical distribution (mail services) and logistics for others on a contract or fee basis. Explanatory Note Exclusion: This class excludes:\n- provision of operating staff to carry out the complete operations of a business, see class according to the business/activity performed\n- provision of only one particular aspect of these activities, see class according to that particular activity',
	},
	{
		id: '7c3153dc-09a2-417a-a3c4-7377217e71e1',
		name: '8610:Hospital activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 8610 Description: Hospital activities Explanatory Note Inclusion: This class includes:\n- short- or long-term hospital activities, i.e. medical, diagnostic and treatment activities, of general hospitals (e.g. community and regional hospitals, hospitals of non-profit organizations, university hospitals, military-base and prison hospitals) and specialized hospitals (e.g. mental health and substance abuse hospitals, hospitals for infectious diseases, maternity hospitals, specialized sanatoriums)\nThe activities are chiefly directed to inpatients, are carried out under the direct supervision of medical doctors and include:\n* services of medical and paramedical staff\n* services of laboratory and technical facilities, including radiologic and anaesthesiologic services\n* emergency room services\n* provision of operating room services, pharmacy services, food and other hospital services\n* services of family planning centres providing medical treatment such as sterilization and termination of pregnancy, with accommodation Explanatory Note Exclusion: This class excludes:\n- laboratory testing and inspection of all types of materials and products, except medical, see 7120\n- veterinary activities, see 7500\n- health activities for military personnel in the field, see 8422\n- dental practice activities of a general or specialized nature, e.g. dentistry, endodontic and pediatric dentistry; oral pathology, orthodontic activities, see 8620\n- private consultants' services to inpatients, see 8620\n- medical laboratory testing, see 8690\n- ambulance transport activities, see 8690",
	},
	{
		id: 'b16e57af-8eb6-487b-8f81-35c160258ad2',
		name: '562:Event catering and other food service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 562 Description: Event catering and other food service activities Explanatory Note Inclusion: This group includes catering activities for individual events or for a specified period of time and the operation of food concessions, such as at sports or similar facilities. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '808872a5-0570-4f88-a433-2300da42dae1',
		name: '0114:Growing of sugar cane',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0114 Description: Growing of sugar cane Explanatory Note Inclusion: This class includes:\n- growing of sugar cane Explanatory Note Exclusion: This class excludes:\n- growing of sugar beet, see 0113',
	},
	{
		id: 'a1976dea-79de-400a-815d-bdf9ed654d45',
		name: '5120:Freight air transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5120 Description: Freight air transport Explanatory Note Inclusion: This class includes:\n- transport freight by air over regular routes and on regular schedules\n- non-scheduled transport of freight by air\n- launching of satellites and space vehicles\n- space transport\n\nThis class also includes:\n- renting of air-transport equipment with operator for the purpose of freight transportation Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b2d33443-29e8-4a41-899f-3b2b3ddc458c',
		name: '2211:Manufacture of rubber tyres and tubes; retreading and rebuilding of rubber',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2211 Description: Manufacture of rubber tyres and tubes; retreading and rebuilding of rubber tyres Explanatory Note Inclusion: This class includes:\n- manufacture of rubber tyres for vehicles, equipment, mobile machinery, aircraft, toy, furniture and other uses:\n* pneumatic tyres\n* solid or cushion tyres\n- manufacture of inner tubes for tyres\n- manufacture of interchangeable tyre treads, tyre flaps, "camelback" strips for retreading tyres etc.\n- tyre rebuilding and retreading Explanatory Note Exclusion: This class excludes:\n- manufacture of tube repair materials, see 2219\n- tyre and tube repair, fitting or replacement, see 4520',
	},
	{
		id: '8cfa3e81-4aac-4960-950e-46ac8a789a83',
		name: '1104:Manufacture of soft drinks; production of mineral waters and other bottled',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1104 Description: Manufacture of soft drinks; production of mineral waters and other bottled waters Explanatory Note Inclusion: This class includes:\n- manufacture of non-alcoholic beverages, except non-alcoholic beer and wine\n- production of natural mineral waters and other bottled waters\n- manufacture of soft drinks:\n* non-alcoholic flavoured and/or sweetened waters: lemonade, orangeade, cola, fruit drinks, tonic waters etc. Explanatory Note Exclusion: This class excludes:\n- production of fruit and vegetable juice, see 1030\n- manufacture of milk-based drinks, see 1050\n- manufacture of coffee, tea and mat\u00e9 products, see 1079\n- manufacture of alcohol-based drinks, see 1101, 1102, 1103\n- manufacture of non-alcoholic wine, see 1102\n- manufacture of non-alcoholic beer, see 1103\n- merely bottling and labeling, see 4630 (if performed as part of wholesale) and 8292 (if performed on a fee or contract basis)',
	},
	{
		id: 'b8e98643-c81f-414a-ad7c-36717c5c511c',
		name: '8129:Other building and industrial cleaning activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8129 Description: Other building and industrial cleaning activities Explanatory Note Inclusion: This class includes:\n- exterior cleaning of buildings of all types, including offices, factories, shops, institutions and other business and professional premises and multiunit residential buildings\n- specialized cleaning activities for buildings such as window cleaning, chimney cleaning and cleaning of fireplaces, stoves, furnaces, incinerators, boilers, ventilation ducts and exhaust units\n- swimming pool cleaning and maintenance services\n- cleaning of industrial machinery\n- bottle cleaning\n- cleaning of trains, buses, planes, etc.\n- cleaning of the inside of road and sea tankers \n- disinfecting and exterminating activities \n- street sweeping and snow and ice removal\n- other building and industrial cleaning activities, n.e.c. Explanatory Note Exclusion: This class excludes:\n- agriculture pest control, see 0161\n- cleaning of sewers and drains, see 3700\n- automobile cleaning, car wash, see 4520',
	},
	{
		id: 'c0bb839f-642f-49dd-a562-1958a8194482',
		name: '872:Residential care activities for mental retardation, mental health and substa',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 872 Description: Residential care activities for mental retardation, mental health and substance abuse Explanatory Note Inclusion: See class 8720. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f1f2bb97-5781-490e-9fd2-1dfbd7932b48',
		name: '2740:Manufacture of electric lighting equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2740 Description: Manufacture of electric lighting equipment Explanatory Note Inclusion: This class includes the manufacture of electric light bulbs and tubes and parts and components thereof (except glass blanks for electric light bulbs), electric lighting fixtures and lighting fixture components (except current-carrying wiring devices).\n\nThis class includes:\n- manufacture of discharge, incandescent, fluorescent, ultra-violet, infra-red etc. lamps, fixtures and bulbs\n- manufacture of ceiling lighting fixtures\n- manufacture of chandeliers\n- manufacture of table lamps (i.e. lighting fixture)\n- manufacture of Christmas tree lighting sets \n- manufacture of electric fireplace logs \n- manufacture of flashlights\n- manufacture of electric insect lamps\n- manufacture of lanterns (e.g. carbide, electric, gas, gasoline, kerosene)\n- manufacture of spotlights\n- manufacture of street lighting fixtures (except traffic signals)\n- manufacture of lighting equipment for transportation equipment (e.g. for motor vehicles, aircraft, boats)\n\nThis class also includes:\n- manufacture of non-electrical lighting equipment Explanatory Note Exclusion: This class excludes:\n- manufacture of glassware and glass parts for lighting fixtures, see 2310\n- manufacture of current-carrying wiring devices for lighting fixtures, see 2733\n- manufacture of ceiling fans or bath fans with integrated lighting fixtures, see 2750\n- manufacture of electrical signalling equipment such as traffic lights and pedestrian signalling equipment, see 2790',
	},
	{
		id: '3aa0f2c5-1d26-4f98-8c2c-7406d4b7f2ae',
		name: '1910:Manufacture of coke oven products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1910 Description: Manufacture of coke oven products Explanatory Note Inclusion: This class includes:\n- operation of coke ovens\n- production of coke and semi-coke\n- production of pitch and pitch coke\n- production of coke oven gas\n- production of crude coal and lignite tars\n- agglomeration of coke Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0f425036-6bc2-4332-a5ef-77e65dc922b9',
		name: '970:Activities of households as employers of domestic personnel',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 970 Description: Activities of households as employers of domestic personnel Explanatory Note Inclusion: See class 9700. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a552e7c0-f0b1-4da2-a5b4-965cd7a61450',
		name: '3030:Manufacture of air and spacecraft and related machinery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3030 Description: Manufacture of air and spacecraft and related machinery Explanatory Note Inclusion: This class includes:\n- manufacture of airplanes for the transport of goods or passengers, for use by the defence forces, for sport or other purposes\n- manufacture of helicopters\n- manufacture of gliders, hang-gliders\n- manufacture of dirigibles and hot air balloons\n- manufacture of parts and accessories of the aircraft of this class:\n* major assemblies such as fuselages, wings, doors, control surfaces, landing gear, fuel tanks, nacelles etc.\n* airscrews, helicopter rotors and propelled rotor blades\n* motors and engines of a kind typically found on aircraft\n* parts of turbojets and turboprops for aircraft\n- manufacture of ground flying trainers\n- manufacture of spacecraft and launch vehicles, satellites, planetary probes, orbital stations, shuttles\n- manufacture of intercontinental ballistic missiles (ICBM)\n\nThis class also includes:\n- overhaul and conversion of aircraft or aircraft engines\n- manufacture of aircraft seats Explanatory Note Exclusion: This class excludes:\n- manufacture of parachutes, see 1392\n- manufacture of military ordinance and ammunition, see 2520\n- manufacture of telecommunication equipment for satellites, see 2630\n- manufacture of aircraft instrumentation and aeronautical instruments, see 2651\n- manufacture of air navigation systems, see 2651\n- manufacture of lighting equipment for aircraft, see 2740\n- manufacture of ignition parts and other electrical parts for internal combustion engines, see 2790\n- manufacture of pistons, piston rings and carburetors, see 2811\n- manufacture of aircraft launching gear, aircraft carrier catapults and related equipment, see 2829',
	},
	{
		id: 'b0bf5916-d21e-4f91-9b90-f09c08ac560d',
		name: '6530:Pension funding',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 6530 Description: Pension funding Explanatory Note Inclusion: This class includes legal entities (i.e. funds, plans and/or programmes) organized to provide retirement income benefits exclusively for the sponsor's employees or members. This includes pension plans with defined benefits, as well as individual plans where benefits are simply defined through the member's contribution.\n\nThis class includes:\n- employee benefit plans\n- pension funds and plans\n- retirement plans Explanatory Note Exclusion: This class excludes:\n- management of pension funds, see 6630\n- compulsory social security schemes, see 8430",
	},
	{
		id: '477f7175-25b2-4aea-b27f-264ab59841d4',
		name: '4763:Retail sale of sporting equipment in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4763 Description: Retail sale of sporting equipment in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of sports goods, fishing gear, camping goods, boats and bicycles Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '41022f00-94c2-4cd0-963c-be4902deb488',
		name: '799:Other reservation service and related activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 799 Description: Other reservation service and related activities Explanatory Note Inclusion: See class 7990. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '172f4d11-46f4-43f2-a49e-eae5e66dd79f',
		name: '0162:Support activities for animal production',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0162 Description: Support activities for animal production Explanatory Note Inclusion: This class includes:\n- agricultural activities on a fee or contract basis:\n* activities to promote propagation, growth and output of animals\n* herd testing services, droving services, agistment services, poultry caponizing, coop cleaning etc.\n* activities related to artificial insemination\n* stud services\n* sheep shearing\n* farm animal boarding and care\n\nThis class also includes:\n- activities of farriers Explanatory Note Exclusion: This class excludes:\n- provision of space for animal boarding only, see 6810\n- veterinary activities, see 7500\n- vaccination of animals, see 7500\n- renting of animals (e.g. herds), see 7730\n- service activities to promote commercial hunting and trapping, see 9499\n- pet boarding, see 9609',
	},
	{
		id: '322d69ab-3e6a-483c-94fb-3d4d650fa7ed',
		name: '0891:Mining of chemical and fertilizer minerals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0891 Description: Mining of chemical and fertilizer minerals Explanatory Note Inclusion: This class includes:\n- mining of natural phosphates and natural potassium salts\n- mining of native sulphur\n- extraction and preparation of pyrites and pyrrhotite, except roasting\n- mining of natural barium sulphate and carbonate (barytes and witherite), natural borates, natural magnesium sulphates (kieserite)\n- mining of earth colours, fluorspar and other minerals valued chiefly as a source of chemicals\n\nThis class also includes:\n- guano mining Explanatory Note Exclusion: This class excludes:\n- extraction of salt, see 0893\n- roasting of iron pyrites, see 2011\n- manufacture of synthetic fertilizers and nitrogen compounds, see 2012',
	},
	{
		id: 'fe3768e5-7662-4ae5-a119-74ec1c66b07b',
		name: '8412:Regulation of the activities of providing health care, education, cultural',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8412 Description: Regulation of the activities of providing health care, education, cultural services and other social services, excluding social security Explanatory Note Inclusion: This class includes:\n- public administration of programmes aimed to increase personal well-being:\n* health\n* education\n* culture\n* sport\n* recreation\n* environment\n* housing\n* social services\n- public administration of R&D policies and associated funds for these areas\n\nThis class also includes: \n- sponsoring of recreational and cultural activities\n- distribution of public grants to artists\n- administration of potable water supply programmes\n- administration of waste collection and disposal operations\n- administration of environmental protection programmes\n- administration of housing programmes Explanatory Note Exclusion: This class excludes: \n- sewage, refuse disposal and remediation activities, see divisions 37, 38, 39\n- compulsory social security activities, see 8430\n- education activities, see division 85\n- human health-related activities, see division 86\n- activities of libraries and archives (private, public or government operated), see 9101\n- operation of museums and other cultural institutions, see 9102\n- sporting or other recreational activities, see division 93',
	},
	{
		id: 'a8939b46-4945-46ff-91ce-c9366b941526',
		name: '2822:Manufacture of metal-forming machinery and machine tools',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2822 Description: Manufacture of metal-forming machinery and machine tools Explanatory Note Inclusion: This class includes:\n- manufacture of machine tools for working metals and other materials (wood, bone, stone, hard rubber, hard plastics, cold glass etc.), including those using a laser beam, ultrasonic waves, plasma arc, magnetic pulse etc.\n- manufacture of machine tools for turning, drilling, milling, shaping, planing, boring, grinding etc.\n- manufacture of stamping or pressing machine tools\n- manufacture of punch presses, hydraulic presses, hydraulic brakes, drop hammers, forging machines etc.\n- manufacture of draw-benches, thread rollers or machines for working wires\n- manufacture of stationary machines for nailing, stapling, glueing or otherwise assembling wood, cork, bone, hard rubber or plastics etc.\n- manufacture of stationary rotary or rotary percussion drills, filing machines, riveters, sheet metal cutters etc.\n- manufacture of presses for the manufacture of particle board and the like\n- manufacture of electroplating machinery\n\nThis class also includes:\n- manufacture of parts and accessories for the machine tools listed above: work holders, dividing heads and other special attachments for machine tools Explanatory Note Exclusion: This class excludes:\n- manufacture of interchangeable tools for hand tools or machine tools (drills, punches, dies, taps, milling cutters, turning tools, saw blades, cutting knives etc.), see 2593\n- manufacture of electric hand held soldering irons and soldering guns, see 2790\n- manufacture of power-driven hand tools, see 2818\n- manufacture of machinery used in metal mills or foundries, see 2823\n- manufacture of machinery for mining and quarrying, see 2824',
	},
	{
		id: '075c140c-606d-4947-ada4-267eb0d1cb3d',
		name: '843:Compulsory social security activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 843 Description: Compulsory social security activities Explanatory Note Inclusion: See class 8430. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a78389fe-3c09-40bd-8ae9-e48552193eee',
		name: '4653:Wholesale of agricultural machinery, equipment and supplies',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4653 Description: Wholesale of agricultural machinery, equipment and supplies Explanatory Note Inclusion: This class includes:\n- wholesale of agricultural machinery and equipment:\n* ploughs, manure spreaders, seeders\n* harvesters\n* threshers\n* milking machines\n* poultry-keeping machines, bee-keeping machines\n* tractors used in agriculture and forestry\n\nThis class also includes:\n- lawn mowers however operated Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '186dbe60-2403-48ce-accc-6a7666c3c28b',
		name: 'E:Water supply; sewerage, waste management and remediation activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: E Description: Water supply; sewerage, waste management and remediation activities Explanatory Note Inclusion: This section includes activities related to the management (including collection, treatment and disposal) of various forms of waste, such as solid or non-solid industrial or household waste, as well as contaminated sites. The output of the waste or sewage treatment process can either be disposed of or become an input into other production processes. Activities of water supply are also grouped in this section, since they are often carried out in connection with, or by units also engaged in, the treatment of sewage. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c0fc337b-4b42-4a91-a61b-516092e0bf8e',
		name: '0729:Mining of other non-ferrous metal ores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0729 Description: Mining of other non-ferrous metal ores Explanatory Note Inclusion: This class includes:\n- mining and preparation of ores valued chiefly for non-ferrous metal content:\n* aluminium (bauxite), copper, lead, zinc, tin, manganese, chrome, nickel, cobalt, molybdenum, tantalum, vanadium etc.\n* precious metals: gold, silver, platinum Explanatory Note Exclusion: This class excludes:\n- mining and preparation of uranium and thorium ores, see 0721\n- production of aluminium oxide and mattes of nickel or of copper, see 2420',
	},
	{
		id: '72ca86ab-1069-4247-8d6b-5d38ed417d7b',
		name: '325:Manufacture of medical and dental instruments and supplies',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 325 Description: Manufacture of medical and dental instruments and supplies Explanatory Note Inclusion: See class 3250. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '3ea4048a-988d-47c6-8ed3-d03b456305ba',
		name: '201:Manufacture of basic chemicals, fertilizers and nitrogen compounds, plastics',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 201 Description: Manufacture of basic chemicals, fertilizers and nitrogen compounds, plastics and synthetic rubber in primary forms Explanatory Note Inclusion: This group includes the manufacture of basic chemical products, fertilizers and associated nitrogen compounds, as well as plastics and synthetic rubber in primary forms. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0d72613e-17e0-4e29-882d-f11a84167ccf',
		name: '1050:Manufacture of dairy products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1050 Description: Manufacture of dairy products Explanatory Note Inclusion: This class includes:\n- manufacture of fresh liquid milk, pasteurized, sterilized, homogenized and/or ultra heat treated\n- manufacture of milk-based drinks\n- manufacture of cream from fresh liquid milk, pasteurized, sterilized, homogenized\n- manufacture of dried or concentrated milk whether or not sweetened\n- manufacture of milk or cream in solid form\n- manufacture of butter\n- manufacture of yoghurt\n- manufacture of cheese and curd\n- manufacture of whey\n- manufacture of casein or lactose\n- manufacture of ice cream and other edible ice such as sorbet Explanatory Note Exclusion: This class excludes:\n- production of raw milk (cattle), see 0141\n- production of raw milk (camels, etc.), see 0143\n- production of raw milk (sheep, goats, horses, asses, etc.), see 0144\n- manufacture of non-dairy milk and cheese substitutes, see 1079\n- activities of ice cream parlours, see 5610',
	},
	{
		id: '7acece3e-fa0c-495f-8f60-87cd1af42c6c',
		name: '910:Libraries, archives, museums and other cultural activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 910 Description: Libraries, archives, museums and other cultural activities Explanatory Note Inclusion: See division 91. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a4380fe8-90be-4f61-a3bc-5a1f615a8de0',
		name: '661:Activities auxiliary to financial service activities, except insurance and p',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 661 Description: Activities auxiliary to financial service activities, except insurance and pension funding Explanatory Note Inclusion: This group includes the furnishing of physical or electronic marketplaces for the purpose of facilitating the buying and selling of stocks, stock options, bonds or commodity contracts. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '465500d5-922b-4a98-b4d1-8fdd44a42343',
		name: '022:Logging',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 022 Description: Logging Explanatory Note Inclusion: See class 0220. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4dfb6ed1-f5f4-472d-8b0b-24467bdc6eaa',
		name: '721:Research and experimental development on natural sciences and engineering',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 721 Description: Research and experimental development on natural sciences and engineering Explanatory Note Inclusion: See class 7210. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a76af610-f537-4c26-ac19-6680f14cdf70',
		name: '37:Sewerage',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 37 Description: Sewerage Explanatory Note Inclusion: This division includes the operation of sewer systems or sewage treatment facilities that collect, treat, and dispose of sewage. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '122eb40b-ec0b-4b74-b8f6-b804a1306519',
		name: '4210:Construction of roads and railways',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4210 Description: Construction of roads and railways Explanatory Note Inclusion: This class includes:\n- construction of motorways, streets, roads, other vehicular and pedestrian ways\n- surface work on streets, roads, highways, bridges or tunnels:\n* asphalt paving of roads\n* road painting and other marking\n* installation of crash barriers, traffic signs and the like\n- construction of bridges, including those for elevated highways \n- construction of tunnels\n- construction of railways and subways\n- construction of airfield runways Explanatory Note Exclusion: This class excludes:\n- installation of street lighting and electrical signals, see 4321\n- architectural and engineering activities, see 7110\n- project management activities related to civil engineering works, see 7110',
	},
	{
		id: '835a354d-caa4-4bcc-b8bd-c659d7847392',
		name: '5812:Publishing of directories and mailing lists',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5812 Description: Publishing of directories and mailing lists Explanatory Note Inclusion: This class includes the publishing of lists of facts/information (databases) that are protected in their form, but not in their content. These lists can be published in printed or electronic form.\n\nThis class includes:\n- publishing of mailing lists\n- publishing of telephone books\n- publishing of other directories and compilations, such as case law, pharmaceutical compendia etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '45e0d63f-f176-49f2-a053-8033c5f89e77',
		name: '1610:Sawmilling and planing of wood',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1610 Description: Sawmilling and planing of wood Explanatory Note Inclusion: This class includes:\n- sawing, planing and machining of wood\n- slicing, peeling or chipping logs\n- manufacture of wooden railway sleepers\n- manufacture of unassembled wooden flooring\n- manufacture of wood wool, wood flour, chips, particles\n\nThis class also includes:\n- drying of wood\n- impregnation or chemical treatment of wood with preservatives or other materials Explanatory Note Exclusion: This class excludes:\n- logging and production of wood in the rough, see 0220\n- manufacture of veneer sheets thin enough for use in plywood, boards and panels, see 1621\n- manufacture of shingles and shakes, beadings and mouldings, see 1622',
	},
	{
		id: '23f6551b-9ef0-4091-bf94-b3f502254976',
		name: '3315:Repair of transport equipment, except motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3315 Description: Repair of transport equipment, except motor vehicles Explanatory Note Inclusion: This class includes the repair and maintenance of transport equipment of division 30, except motorcycles and bicycles. However, the factory rebuilding or overhaul of ships, locomotives, railroad cars and aircraft is classified in division 30.\n\nThis class includes:\n- repair and routine maintenance of ships\n- repair and maintenance of pleasure boats\n- repair and maintenance of locomotives and railroad cars (except factory rebuilding or factory conversion)\n- repair and maintenance of aircraft (except factory conversion, factory overhaul, factory rebuilding)\n- repair and maintenance of aircraft engines\n- repair of animal drawn buggies and wagons Explanatory Note Exclusion: This class excludes:\n- factory rebuilding of ships, see 3010\n- factory rebuilding of locomotives and railroad cars, see 3020\n- factory rebuilding of aircraft, see 3030\n- repair of ship or rail engines, see 3312\n- ship scaling, dismantling, see 3830\n- repair and maintenance of motorcycles, see 4540\n- repair of bicycles and invalid carriages, see 9529',
	},
	{
		id: '3e174aa1-0f01-4267-a84d-fa211a90dc7f',
		name: '0230:Gathering of non-wood forest products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0230 Description: Gathering of non-wood forest products Explanatory Note Inclusion: This class includes the gathering of non-wood forest products and other plants growing in the wild.\n\nThis class includes:\n- gathering of wild growing materials:\n* mushrooms, truffles\n* berries\n* nuts\n* balata and other rubber-like gums\n* cork\n* lac and resins\n* balsams\n* vegetable hair\n* eelgrass\n* acorns, horse chestnuts\n* mosses and lichens Explanatory Note Exclusion: This class excludes:\n- managed production of any of these products (except growing of cork trees), see division 01\n- growing of mushrooms or truffles, see 0113\n- growing of berries or nuts, see 0125\n- gathering of fire wood, see 0220',
	},
	{
		id: 'e1dd95a1-c4d9-40c0-a0d9-678e6f41614e',
		name: '582:Software publishing',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 582 Description: Software publishing Explanatory Note Inclusion: See class 5820. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8fe1e40c-d528-4eeb-88fc-b93bba5a59e2',
		name: '191:Manufacture of coke oven products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 191 Description: Manufacture of coke oven products Explanatory Note Inclusion: See class 1910. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd661de0f-3dbd-45e8-ad50-b37bb139fe6f',
		name: '522:Support activities for transportation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 522 Description: Support activities for transportation Explanatory Note Inclusion: This group includes activities supporting the transport of passengers or freight, such as operation of parts of the transport infrastructure or activities related to handling freight immediately before or after transport or between transport segments. The operation and maintenance of all transport facilities is included. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4c78997e-1035-43ab-8ca2-3f100960b5a1',
		name: '251:Manufacture of structural metal products, tanks, reservoirs and steam genera',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 251 Description: Manufacture of structural metal products, tanks, reservoirs and steam generators Explanatory Note Inclusion: This group includes the manufacture of structural metal products (such as metal frameworks or parts for construction), as well as metal container-type objects (such as reservoirs, tanks, central heating boilers) and steam generators. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8038dee9-b4e1-4fd4-97e3-b3a13a717eb5',
		name: '7830:Other human resources provision',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7830 Description: Other human resources provision Explanatory Note Inclusion: This class includes:\n- provision of human resources for client businesses\n\nThis provision of human resources is typically done on a long-term or permanent basis and the units classified here may perform a wide range of human resource and personnel management duties associated with this provision.\nThe units classified here represent the employer of record for the employees on matters relating to payroll, taxes, and other fiscal and human resource issues, but they are not responsible for direction and supervision of employees. Explanatory Note Exclusion: This class excludes:\n- provision of human resources functions together with supervision or running of the business, see the class in the respective economic activity of that business\n- provision of human resources to temporarily replace or supplement the workforce of the client, see 7820',
	},
	{
		id: '1a1f36d4-8a3a-4a97-b46c-29ec5ac8f30e',
		name: '681:Real estate activities with own or leased property',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 681 Description: Real estate activities with own or leased property Explanatory Note Inclusion: See class 6810. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '62b0862f-0e2b-4b70-8e0d-48b18b119158',
		name: '324:Manufacture of games and toys',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 324 Description: Manufacture of games and toys Explanatory Note Inclusion: See class 3240. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7a65589f-b543-40e8-9dd7-c5f6040a4db4',
		name: '331:Repair of fabricated metal products, machinery and equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 331 Description: Repair of fabricated metal products, machinery and equipment Explanatory Note Inclusion: This group includes the specialized repair of goods produced in the manufacturing sector with the aim to restore these metal products, machinery, equipment and other products to working order. The provision of general or routine maintenance (i.e. servicing) on such products to ensure they work efficiently and to prevent breakdown and unnecessary repairs is included. Explanatory Note Exclusion: This group excludes:\n- rebuilding or remanufacturing of machinery and equipment, see corresponding class in divisions 25-31 \n- cleaning of industrial machinery, see 8129\n- repair and maintenance of computers and communications equipment, see group 951\n- repair and maintenance of household goods, see group 952',
	},
	{
		id: 'b5955948-d7c0-4830-bc29-c19b29faad29',
		name: '2660:Manufacture of irradiation, electromedical and electrotherapeutic equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2660 Description: Manufacture of irradiation, electromedical and electrotherapeutic equipment Explanatory Note Inclusion: This class includes:\n- manufacture of irradiation apparatus and tubes (e.g. industrial, medical diagnostic, medical therapeutic, research, scientific):\n* beta-, gamma, X-ray or other radiation equipment\n- manufacture of CT scanners\n- manufacture of PET scanners\n- manufacture of magnetic resonance imaging (MRI) equipment\n- manufacture of medical ultrasound equipment\n- manufacture of electrocardiographs\n- manufacture of electromedical endoscopic equipment\n- manufacture of medical laser equipment\n- manufacture of pacemakers\n- manufacture of hearing aids\n\nThis class also includes:\n- manufacture of food and milk irradiation equipment Explanatory Note Exclusion: This class excludes:\n- manufacture of laboratory analytical instruments (e.g. blood analysis equipment), see 2651\n- manufacture of tanning beds, see 2790',
	},
	{
		id: '5020424a-5b73-4722-8000-ac205dbd592d',
		name: '3520:Manufacture of gas; distribution of gaseous fuels through mains',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3520 Description: Manufacture of gas; distribution of gaseous fuels through mains Explanatory Note Inclusion: This class includes the manufacture of gas and the distribution of natural or synthetic gas to the consumer through a system of mains. Gas marketers or brokers, which arrange the sale of natural gas over distribution systems operated by others, are included. \nThe separate operation of gas pipelines, typically done over long distances, connecting producers with distributors of gas, or between urban centers, is excluded from this class and classified with other pipeline transport activities.\n\nThis class includes:\n- production of gas for the purpose of gas supply by carbonation of coal, from by-products of agriculture or from waste\n- manufacture of gaseous fuels with a specified calorific value, by purification, blending and other processes from gases of various types including natural gas\n- transportation, distribution and supply of gaseous fuels of all kinds through a system of mains\n- sale of gas to the user through mains\n- activities of gas brokers or agents that arrange the sale of gas over gas distribution systems operated by others\n- commodity and transport capacity exchanges for gaseous fuels Explanatory Note Exclusion: This class excludes:\n- operation of coke ovens, see 1910\n- manufacture of refined petroleum products, see 1920\n- manufacture of industrial gases, see 2011\n- wholesale of gaseous fuels, see 4661\n- retail sale of bottled gas, see 4773\n- direct selling of fuel, see 4799\n- (long-distance) transportation of gases by pipelines, see 4930',
	},
	{
		id: 'f57972af-fd2f-42b1-8bbf-6e4720adb494',
		name: '8291:Activities of collection agencies and credit bureaus',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8291 Description: Activities of collection agencies and credit bureaus Explanatory Note Inclusion: This class includes:\n- collection of payments for claims and remittance of payments collected to the clients, such as bill or debt collection services\n- compiling of information, such as credit and employment histories on individuals and credit histories on businesses and providing the information to financial institutions, retailers and others who have a need to evaluate the creditworthiness of these persons and businesses Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '85821f48-ac2f-44b6-a008-11f2ec6b0173',
		name: '7120:Technical testing and analysis',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7120 Description: Technical testing and analysis Explanatory Note Inclusion: This class includes:\n- performance of physical, chemical and other analytical testing of all types of materials and products (see below for exceptions):\n* acoustics and vibration testing\n* testing of composition and purity of minerals etc.\n* testing activities in the field of food hygiene, including veterinary testing and control in relation to food production\n* testing of physical characteristics and performance of materials, such as strength, thickness, durability, radioactivity etc.\n* qualification and reliability testing\n* performance testing of complete machinery: motors, automobiles, electronic equipment etc.\n* radiographic testing of welds and joints\n* failure analysis\n* testing and measuring of environmental indicators: air and water pollution etc.\n- certification of products, including consumer goods, motor vehicles, aircraft, pressurized containers, nuclear plants etc.\n- periodic road-safety testing of motor vehicles\n- testing with use of models or mock-ups (e.g. of aircraft, ships, dams etc.)\n- operation of police laboratories Explanatory Note Exclusion: This class excludes:\n- testing of animal specimens, see 7500\n- medical laboratory testing, see 8690',
	},
	{
		id: '49e37174-49ec-45f8-bcbf-3220772406a2',
		name: '2029:Manufacture of other chemical products n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2029 Description: Manufacture of other chemical products n.e.c. Explanatory Note Inclusion: This class includes:\n- manufacture of propellant powders\n- manufacture of explosives and pyrotechnic products, including percussion caps, detonators, signalling flares etc.\n- manufacture of gelatine and its derivatives, glues and prepared adhesives, including rubber-based glues and adhesives\n- manufacture of extracts of natural aromatic products\n- manufacture of resinoids\n- manufacture of aromatic distilled waters\n- manufacture of mixtures of odoriferous products for the manufacture of perfumes or food\n- manufacture of photographic plates, films, sensitized paper and other sensitized unexposed materials\n- manufacture of chemical preparations for photographic uses\n- manufacture of various chemical products:\n* peptones, peptone derivatives, other protein substances and their derivatives n.e.c.\n* essential oils\n* chemically modified oils and fats\n* materials used in the finishing of textiles and leather\n* powders and pastes used in soldering, brazing or welding\n* substances used to pickle metal\n* prepared additives for cements\n* activated carbon, lubricating oil additives, prepared rubber accelerators, catalysts and other chemical products for industrial use\n* anti-knock preparations, antifreeze preparations\n* composite diagnostic or laboratory reagents\n\nThis class also includes:\n- manufacture of writing and drawing ink\n- manufacture of matches Explanatory Note Exclusion: This class excludes:\n- manufacture of chemically defined products in bulk, see 2011\n- manufacture of distilled water, see 2011\n- manufacture of synthetic aromatic products, see 2011\n- manufacture of printing ink, see 2022\n- manufacture of perfumes and toilet preparations, see 2023\n- manufacture of asphalt-based adhesives, see 2399',
	},
	{
		id: 'afd2c024-06bf-4d12-9e4e-96aeb3655476',
		name: '9499:Activities of other membership organizations n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 9499 Description: Activities of other membership organizations n.e.c. Explanatory Note Inclusion: This class includes:\n- activities of organizations not directly affiliated to a political party furthering a public cause or issue by means of public education, political influence, fund-raising etc.:\n* citizens initiative or protest movements\n* environmental and ecological movements\n* organizations supporting community and educational facilities n.e.c.\n* organizations for the protection and betterment of special groups, e.g. ethnic and minority groups\n* associations for patriotic purposes, including war veterans' associations\n- consumer associations\n- automobile associations\n- associations for the purpose of social acquaintanceship such as rotary clubs, lodges etc.\n- associations of youth, young persons' associations, student associations, clubs and fraternities etc.\n- associations for the pursuit of a cultural or recreational activity or hobby (other than sports or games), e.g. poetry, literature and book clubs, historical clubs, gardening clubs, film and photo clubs, music and art clubs, craft and collectors' clubs, social clubs, carnival clubs etc.\n\nThis class also includes:\n- grant giving activities by membership organizations or others Explanatory Note Exclusion: This class excludes:\n- activities of professional artistic groups or organizations, see 9000\n- activities of sports clubs, see 9312\n- activities of professional membership associations, see 9412",
	},
	{
		id: 'a9171030-8899-4406-8550-f53d77c432d9',
		name: '6520:Reinsurance',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6520 Description: Reinsurance Explanatory Note Inclusion: This class includes:\n- activities of assuming all or part of the risk associated with existing insurance policies originally underwritten by other insurance carriers Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5ca2d3ba-edf1-4ed2-bfef-ecd66b275eab',
		name: '479:Retail trade not in stores, stalls or markets',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 479 Description: Retail trade not in stores, stalls or markets Explanatory Note Inclusion: This group includes retail sale activities by mail order houses, over the Internet, through door-to-door sales, vending machines etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5627415f-1681-46ff-b351-ed50bf256608',
		name: '691:Legal activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 691 Description: Legal activities Explanatory Note Inclusion: See class 6910. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ca6eb4bd-a733-4d47-a92b-ac49c8e401d2',
		name: '11:Manufacture of beverages',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 11 Description: Manufacture of beverages Explanatory Note Inclusion: This division includes the manufacture of beverages, such as nonalcoholic beverages and mineral water, manufacture of alcoholic beverages mainly through fermentation, beer and wine, and the manufacture of distilled alcoholic beverages.\n\nThis division excludes the production of fruit and vegetable juices (see class 1030), the manufacture of milk-based drinks (see class 1050) and the manufacture of coffee, tea and mat\u00e9 products (see class 1079). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'be32b64f-8a15-4711-b4a4-bca24c72b7f3',
		name: '15:Manufacture of leather and related products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 15 Description: Manufacture of leather and related products Explanatory Note Inclusion: This division includes dressing and dyeing of fur and the transformation of hides into leather by tanning or curing and fabricating the leather into products for final consumption. It also includes the manufacture of similar products from other materials (imitation leathers or leather substitutes), such as rubber footwear, textile luggage etc. The products made from leather substitutes are included here, since they are made in ways similar to those in which leather products are made (e.g. luggage) and are often produced in the same unit. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9af8ebae-77fa-467b-a68a-d70b626e07e0',
		name: '5310:Postal activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5310 Description: Postal activities Explanatory Note Inclusion: This class includes the activities of postal services operating under a universal service obligation. The activities include use of the universal service infrastructure, including retail locations, sorting and processing facilities, and carrier routes to pickup and deliver the mail. The delivery can include letter-post, i.e. letters, postcards, printed papers (newspaper, periodicals, advertising items, etc.), small packets, goods or documents. Also included are other services necessary to support the universal service obligation.\n\nThis class includes:\n- pickup, sorting, transport and delivery (domestic or international) of letter-post and (mail-type) parcels and packages by postal services operating under a universal service obligation. One or more modes of transport may be involved and the activity may be carried out with either self-owned (private) transport or via public transport.\n- collection of letter-mail and parcels from public letter-boxes or from post offices\n- distribution and delivery of mail and parcels Explanatory Note Exclusion: This class excludes:\n- postal giro, postal savings activities and money order activities, see 6419',
	},
	{
		id: 'd1c26894-96fd-4356-9a31-823ae41a9545',
		name: '602:Television programming and broadcasting activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 602 Description: Television programming and broadcasting activities Explanatory Note Inclusion: See class 6020. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b976e564-23c6-494a-b5c5-c2c1c8ac50ed',
		name: 'Q:Human health and social work activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: Q Description: Human health and social work activities Explanatory Note Inclusion: This section includes the provision of health and social work activities. Activities include a wide range of activities, starting from health care provided by trained medical professionals in hospitals and other facilities, over residential care activities that still involve a degree of health care activities to social work activities without any involvement of health care professionals. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5b65d7b1-2021-4104-af93-411587d8e37e',
		name: '3313:Repair of electronic and optical equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3313 Description: Repair of electronic and optical equipment Explanatory Note Inclusion: This class includes the repair and maintenance of goods produced in groups 265, 266 and 267, except those that are considered household goods.\n\nThis class includes:\n- repair and maintenance of the measuring, testing, navigating and control equipment of group 265, such as: \n* aircraft engine instruments\n* automotive emissions testing equipment\n* meteorological instruments\n* physical, electrical and chemical properties testing and inspection equipment\n* surveying instruments\n* radiation detection and monitoring instruments\n- repair and maintenance of irradiation, electromedical and electrotherapeutic equipment of class 2660, such as: \n* magnetic resonance imaging equipment\n* medical ultrasound equipment\n* pacemakers\n* hearing aids\n* electrocardiographs\n* electromedical endoscopic equipment \n* irradiation apparatus\n- repair and maintenance of optical instruments and equipment of class 2670, if the use is mainly commercial, such as:\n* binoculars\n* microscopes (except electron and proton microscopes)\n* telescopes\n* prisms and lenses (except ophthalmic)\n* photographic equipment Explanatory Note Exclusion: This class excludes:\n- repair and maintenance of photocopy machines, see 3312\n- repair and maintenance of computers and peripheral equipment, see 9511\n- repair and maintenance of computer projectors, see 9511\n- repair and maintenance of communication equipment, see 9512\n- repair and maintenance of commercial TV and video cameras, see 9512\n- repair of household-type video cameras, see 9521\n- repair of watches and clocks, see 9529',
	},
	{
		id: '15187fcf-972c-4886-b8d4-8da3c6428b19',
		name: '110:Manufacture of beverages',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 110 Description: Manufacture of beverages Explanatory Note Inclusion: See division 11. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9316d807-eac3-4faa-8709-831824c68095',
		name: 'S:Other service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: S Description: Other service activities Explanatory Note Inclusion: This section (as a residual category) includes the activities of membership organizations, the repair of computers and personal and household goods and a variety of personal service activities not covered elsewhere in the classification. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8f5f4b71-77f8-406f-a4f4-b7d20f1ba4a0',
		name: '274:Manufacture of electric lighting equipment',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 274 Description: Manufacture of electric lighting equipment Explanatory Note Inclusion: See class 2740. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2f9c7d9a-60ea-4418-a794-eedc1a8de829',
		name: '0610:Extraction of crude petroleum',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0610 Description: Extraction of crude petroleum Explanatory Note Inclusion: This class includes:\n- extraction of crude petroleum oils\n\nThis class also includes:\n- extraction of bituminous or oil shale and tar sand\n- production of crude petroleum from bituminous shale and sand\n- processes to obtain crude oils: decantation, desalting, dehydration, stabilization etc. Explanatory Note Exclusion: This class excludes:\n- support activities for oil and gas extraction, see 0910\n- oil and gas exploration, see 0910\n- manufacture of refined petroleum products, see 1920\n- recovery of liquefied petroleum gases in the refining of petroleum, see 1920\n- operation of pipelines, see 4930',
	},
	{
		id: '422ab221-89ee-441f-8973-179e5f0f3ea9',
		name: '1812:Service activities related to printing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1812 Description: Service activities related to printing Explanatory Note Inclusion: This class includes:\n- binding of printed sheets, e.g. into books, brochures, magazines, catalogues etc., by folding, assembling, stitching, glueing, collating, basting, adhesive binding, trimming, gold stamping\n- composition, typesetting, phototypesetting, pre-press data input including scanning and optical character recognition, electronic make-up\n- plate-making services including imagesetting and plate-setting (for the printing processes letterpress and offset)\n- engraving or etching of cylinders for gravure\n- plate processes direct to plate (also photopolymer plates)\n- preparation of plates and dies for relief stamping or printing\n- production of proofs\n- artistic work including preparation of litho stones and prepared woodblocks\n- production of reprographic products\n- design of printing products e.g. sketches, layouts, dummies etc.\n- other graphic activities such as die-sinking or die-stamping, Braille copying, punching and drilling, embossing, varnishing and laminating, collating and insetting, creasing Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '557911de-9ad6-4abd-9ec8-e260c2d963cf',
		name: '3092:Manufacture of bicycles and invalid carriages',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 3092 Description: Manufacture of bicycles and invalid carriages Explanatory Note Inclusion: This class includes:\n- manufacture of non-motorized bicycles and other cycles, including (delivery) tricycles, tandems, children's bicycles and tricycles\n- manufacture of parts and accessories of bicycles\n- manufacture of invalid carriages with or without motor\n- manufacture of parts and accessories of invalid carriages\n- manufacture of baby carriages Explanatory Note Exclusion: This class excludes:\n- manufacture of bicycles with auxiliary motor, see 3091\n- manufacture of wheeled toys designed to be ridden, including plastic bicycles and tricycles, see 3240",
	},
	{
		id: '0ccb5995-8d5d-4690-bb95-86848fda3262',
		name: '2816:Manufacture of lifting and handling equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2816 Description: Manufacture of lifting and handling equipment Explanatory Note Inclusion: This class includes:\n- manufacture of hand-operated or power-driven lifting, handling, loading or unloading machinery:\n* pulley tackle and hoists, winches, capstans and jacks\n* derricks, cranes, mobile lifting frames, straddle carriers etc.\n* works trucks, whether or not fitted with lifting or handling equipment, whether or not self-propelled, of the type used in factories (including hand trucks and wheelbarrows)\n* mechanical manipulators and industrial robots specifically designed for lifting, handling, loading or unloading\n- manufacture of conveyors, telfers (t\u00e9l\u00e9ph\u00e9riques) etc.\n- manufacture of lifts, escalators and moving walkways\n- manufacture of parts specialized for lifting and handling equipment Explanatory Note Exclusion: This class excludes:\n- manufacture of continuous-action elevators and conveyors for underground use, see 2824\n- manufacture of mechanical shovels, excavators and shovel loaders, see 2824\n- manufacture of industrial robots for multiple uses, see 2829\n- manufacture of crane-lorries, floating cranes, railway cranes, see 2910, 3011, 3020\n- installation of lifts and elevators, see 4329',
	},
	{
		id: '8561dfe4-c9a0-4582-a7a2-90576f098bca',
		name: '239:Manufacture of non-metallic mineral products n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 239 Description: Manufacture of non-metallic mineral products n.e.c. Explanatory Note Inclusion: This group includes the manufacture of intermediate and final products from mined or quarried non-metallic minerals, such as sand, gravel, stone or clay. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'fe497789-229f-4587-ab6e-5485b4bda9a9',
		name: 'F:Construction',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: F Description: Construction Explanatory Note Inclusion: This section includes general construction and specialized construction activities for buildings and civil engineering works. It includes new work, repair, additions and alterations, the erection of prefabricated buildings or structures on the site and also construction of a temporary nature. \n\nGeneral construction is the construction of entire dwellings, office buildings, stores and other public and utility buildings, farm buildings etc., or the construction of civil engineering works such as motorways, streets, bridges, tunnels, railways, airfields, harbours and other water projects, irrigation systems, sewerage systems, industrial facilities, pipelines and electric lines, sports facilities etc. \n\nThis work can be carried out on own account or on a fee or contract basis. Portions of the work and sometimes even the whole practical work can be subcontracted out. A unit that carries the overall responsibility for a construction project is classified here.\n\nAlso included is the repair of buildings and engineering works.\n\nThis section includes the complete construction of buildings (division 41), the complete construction of civil engineering works (division 42), as well as specialized construction activities, if carried out only as a part of the construction process (division 43).\n\nThe renting of construction equipment with operator is classified with the specific construction activity carried out with this equipment.\n\nThis section also includes the development of building projects for buildings or civil engineering works by bringing together financial, technical and physical means to realize the construction projects for later sale. If these activities are carried out not for later sale of the construction projects, but for their operation (e.g. renting of space in these buildings, manufacturing activities in these plants), the unit would not be classified here, but according to its operational activity, i.e. real estate, manufacturing etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2f391c50-0882-4633-aeb3-73cb3c8de009',
		name: '1399:Manufacture of other textiles n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 1399 Description: Manufacture of other textiles n.e.c. Explanatory Note Inclusion: This class includes all activities related to the manufacture of textiles or textile products, not specified elsewhere in division 13 or 14, involving a large number of processes and a great variety of goods produced.\n\nThis class includes:\n- manufacture of narrow woven fabrics, including fabrics consisting of warp without weft assembled by means of an adhesive\n- manufacture of labels, badges etc.\n- manufacture of ornamental trimmings: braids, tassels, pompons etc.\n- manufacture of felt\n- manufacture of tulles and other net fabrics, and of lace and embroidery, in the piece, in strips or in motifs\n- manufacture of fabrics impregnated, coated, covered or laminated with plastics\n- manufacture of metallized yarn or gimped yarn, rubber thread and cord covered with textile material, textile yarn or strip covered, impregnated, coated or sheathed with rubber or plastics\n- manufacture of tyre cord fabric of high-tenacity man-made yarn\n- manufacture of other treated or coated fabrics: tracing cloth, canvas prepared for use by painters, buckram and similar stiffened textile fabrics, fabrics coated with gum or amylaceous substances\n- manufacture of diverse textile articles: textile wicks, incandescent gas mantles and tubular gas mantle fabric, hosepiping, transmission or conveyor belts or belting (whether or not reinforced with metal or other material), bolting cloth, straining cloth\n- manufacture of automotive trimmings\n- manufacture of pressure sensitive cloth-tape\n- manufacture of artists' canvas boards and tracing cloth\n- manufacture of shoe-lace, of textiles\n- manufacture of powder puffs and mitts Explanatory Note Exclusion: This class excludes:\n- manufacture of needle-loom felt floor coverings, see 1393\n- manufacture of textile wadding and articles of wadding: sanitary towels, tampons etc., see 1709\n- manufacture of transmission or conveyor belts of textile fabric, yarn or cord impregnated, coated, covered or laminated with rubber, where rubber is the chief constituent, see 2219\n- manufacture of plates or sheets of cellular rubber or plastic combined with textiles for reinforcing purposes only, see 2219, 2220\n- manufacture of cloth of woven metal wire, see 2599",
	},
	{
		id: '9413f9bd-6f69-48f3-bdfd-47794da756ec',
		name: '081:Quarrying of stone, sand and clay',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 081 Description: Quarrying of stone, sand and clay Explanatory Note Inclusion: See class 0810. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0aa2f712-8853-4f63-ba25-e5bc5dd38a98',
		name: '1629:Manufacture of other products of wood; manufacture of articles of cork, str',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 1629 Description: Manufacture of other products of wood; manufacture of articles of cork, straw and plaiting materials Explanatory Note Inclusion: This class includes:\n- manufacture of various wood products:\n* wooden handles and bodies for tools, brooms, brushes\n* wooden boot or shoe parts (e.g. heels)\n* wooden boot or shoe lasts and trees\n* wooden clothes hangers\n* wooden mirror and picture frames\n* wooden frames for artists' canvases\n* household utensils and kitchenware of wood\n* wooden statuettes and ornaments, wood marquetry, inlaid wood\n* wooden cases for jewellery, cutlery and similar articles\n* wooden spools, cops, bobbins, sewing thread reels and similar articles of turned wood\n* wooden handles for umbrellas, canes and similar\n* wooden blocks for the manufacture of smoking pipes\n* other articles of wood\n- natural cork processing, manufacture of agglomerated cork\n- manufacture of articles of natural or agglomerated cork, including floor coverings\n- manufacture of plaits and products of plaiting materials: mats, matting, screens, cases etc.\n- manufacture of basket-ware and wickerwork\n- manufacture of fire logs, made of pressed wood or substitute materials like coffee or soybean grounds Explanatory Note Exclusion: This class excludes:\n- manufacture of mats or matting of textile materials, see 1392\n- manufacture of luggage, see 1512\n- manufacture of wooden footwear, see 1520\n- manufacture of matches, see 2029\n- manufacture of clock cases, see 2652\n- manufacture of wooden spools and bobbins that are part of textile machinery, see 2826\n- manufacture of furniture, see 3100\n- manufacture of wooden toys, see 3240\n- manufacture of cork life preservers, see 3290\n- manufacture of brushes and brooms, see 3290\n- manufacture of caskets, see 3290",
	},
	{
		id: '8ebc97a6-bc9b-4294-953d-53cd0092cab7',
		name: '2680:Manufacture of magnetic and optical media',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2680 Description: Manufacture of magnetic and optical media Explanatory Note Inclusion: This class includes the manufacture of magnetic and optical recording media.\n\nThis class includes:\n- manufacture of blank magnetic audio and video tapes\n- manufacture of blank magnetic audio and video cassettes\n- manufacture of blank diskettes\n- manufacture of blank optical discs\n- manufacture of hard drive media Explanatory Note Exclusion: This class excludes:\n- reproduction of recorded media (computer media, sound, video, etc.), see 1820',
	},
	{
		id: '1c5e57fe-6f50-400f-b3b2-8c248931bbbe',
		name: '6190:Other telecommunications activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6190 Description: Other telecommunications activities Explanatory Note Inclusion: This class includes:\n- provision of specialized telecommunications applications, such as satellite tracking, communications telemetry, and radar station operations\n- operation of satellite terminal stations and associated facilities operationally connected with one or more terrestrial communications systems and capable of transmitting telecommunications to or receiving telecommunications from satellite systems\n- provision of Internet access over networks between the client and the ISP not owned or controlled by the ISP, such as dial-up Internet access etc.\n- provision of telephone and Internet access in facilities open to the public\n- provision of telecommunications services over existing telecom connections:\n* VOIP (Voice Over Internet Protocol) provision\n- telecommunications resellers (i.e. purchasing and reselling network capacity without providing additional services) Explanatory Note Exclusion: This class excludes:\n- provision of Internet access by operators of telecommunications infrastructure, see 6110, 6120, 6130',
	},
	{
		id: 'a3dc21a5-e3b8-44e5-83c0-703dedbbb480',
		name: '493:Transport via pipeline',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 493 Description: Transport via pipeline Explanatory Note Inclusion: See class 4930. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '331ba9ef-7e34-4c7a-891b-af7b1b450107',
		name: '5630:Beverage serving activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5630 Description: Beverage serving activities Explanatory Note Inclusion: This class includes the preparation and serving of beverages for immediate consumption on the premises.\n\nThis class includes activities of:\n- bars\n- taverns\n- cocktail lounges\n- discotheques (with beverage serving predominant)\n- beer parlors and pubs\n- coffee shops\n- fruit juice bars\n- mobile beverage vendors Explanatory Note Exclusion: This class excludes:\n- reselling packaged/prepared beverages, see 4711, 4722, 4781, 4799\n- operation of discotheques and dance floors without beverage serving, see 9329',
	},
	{
		id: '92b17089-1cf1-4d09-9808-c9277b09af8c',
		name: '9101:Library and archives activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9101 Description: Library and archives activities Explanatory Note Inclusion: This class includes:\n- documentation and information activities of libraries of all kinds, reading, listening and viewing rooms, public archives providing service to the general public or to a special clientele, such as students, scientists, staff, members as well as operation of government archives:\n* organization of a collection, whether specialized or not\n* cataloguing collections\n* lending and storage of books, maps, periodicals, films, records, tapes, works of art etc.\n* retrieval activities in order to comply with information requests etc.\n- stock photo libraries and services Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '6169706c-367f-428b-a87a-abe28f4550fe',
		name: '203:Manufacture of man-made fibres',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 203 Description: Manufacture of man-made fibres Explanatory Note Inclusion: See class 2030. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '25439a9e-5578-4ff2-b441-9aa36311a6f9',
		name: '161:Sawmilling and planing of wood',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 161 Description: Sawmilling and planing of wood Explanatory Note Inclusion: See class 1610. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8d246483-273e-4873-84c8-c13d2475b022',
		name: '639:Other information service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 639 Description: Other information service activities Explanatory Note Inclusion: This group includes the activities of news agencies and all other remaining information service activities. Explanatory Note Exclusion: This group excludes:\n- activities of libraries and archives, see 9101',
	},
	{
		id: 'bc627a3f-31ce-4b42-8a91-18c73efe4372',
		name: '107:Manufacture of other food products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 107 Description: Manufacture of other food products Explanatory Note Inclusion: This group includes the production of a variety of food products not included in previous groups of this division. This includes the production of bakery products, sugar and confectionery, macaroni, noodles and similar products, prepared meals and dishes, coffee, tea and spices, as well as perishable and specialty food products. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '064ab097-b54c-410e-be97-ecd5771cb2ca',
		name: '062:Extraction of natural gas',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 062 Description: Extraction of natural gas Explanatory Note Inclusion: See class 0620. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '68009ca2-60ee-4d5c-a36d-125adbe838a7',
		name: '2023:Manufacture of soap and detergents, cleaning and polishing preparations, pe',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2023 Description: Manufacture of soap and detergents, cleaning and polishing preparations, perfumes and toilet preparations Explanatory Note Inclusion: This class includes:\n- manufacture of organic surface-active agents\n- manufacture of soap\n- manufacture of paper, wadding, felt etc. coated or covered with soap or detergent\n- manufacture of crude glycerol\n- manufacture of surface-active preparations:\n* washing powders in solid or liquid form and detergents\n* dish-washing preparations\n* textile softeners\n- manufacture of cleaning and polishing products:\n* preparations for perfuming or deodorizing rooms\n* artificial waxes and prepared waxes\n* polishes and creams for leather\n* polishes and creams for wood\n* polishes for coachwork, glass and metal\n* scouring pastes and powders, including paper, wadding etc. coated or covered with these\n- manufacture of perfumes and toilet preparations:\n* perfumes and toilet water\n* beauty and make-up preparations\n* sunburn prevention and suntan preparations\n* manicure and pedicure preparations\n* shampoos, hair lacquers, waving and straightening preparations\n* dentifrices and preparations for oral hygiene, including denture fixative preparations\n* shaving preparations, including pre-shave and aftershave preparations\n* deodorants and bath salts\n* depilatories Explanatory Note Exclusion: This class excludes:\n- manufacture of separate, chemically defined compounds, see 2011\n- manufacture of glycerol, synthesized from petroleum products, see 2011\n- extraction and refining of natural essential oils, see 2029',
	},
	{
		id: '32d325ce-21c6-468a-a7cd-a7aef37f1a8d',
		name: '8541:Sports and recreation education',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 8541 Description: Sports and recreation education Explanatory Note Inclusion: This class includes the provision of instruction in athletic activities to groups or individuals, such as by camps and schools. Overnight and day sports instruction camps are also included. This class does not include activities of academic schools, colleges and universities. Instruction may be provided in diverse settings, such as the unit's or client's training facilities, educational institutions or by other means. Instruction provided in this class is formally organized.\n\nThis class includes:\n- sports instruction (baseball, basketball, cricket, football, etc)\n- camps, sports instruction\n- cheerleading instruction\n- gymnastics instruction\n- riding instruction, academies or schools\n- swimming instruction\n- professional sports instructors, teachers, coaches\n- martial arts instruction\n- card game instruction (such as bridge)\n- yoga instruction Explanatory Note Exclusion: This class excludes:\n- cultural education, see 8542",
	},
	{
		id: 'bf633776-93d7-4f1e-8600-6e648507c434',
		name: '5210:Warehousing and storage',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5210 Description: Warehousing and storage Explanatory Note Inclusion: This class includes:\n- operation of storage and warehouse facilities for all kind of goods:\n* operation of grain silos, general merchandise warehouses, refrigerated warehouses, storage tanks etc.\n\nThis class also includes:\n- storage of goods in foreign trade zones\n- blast freezing Explanatory Note Exclusion: This class excludes:\n- parking facilities for motor vehicles, see 5221\n- operation of self storage facilities, see 6810\n- renting of vacant space, see 6810',
	},
	{
		id: 'c17f6a98-94cf-4054-9323-7c23f1f2e5ae',
		name: '9412:Activities of professional membership organizations',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 9412 Description: Activities of professional membership organizations Explanatory Note Inclusion: This class includes:\n- activities of organizations whose members' interests centre chiefly on a particular scientific discipline, professional practice or technical field, such as medical associations, legal associations, accounting associations, engineering associations, architects associations etc.\n- activities of associations of specialists engaged in cultural activities, such as associations of writers, painters, performers of various kinds, journalists etc.\n- dissemination of information, the establishment and supervision of standards of practice, representation before government agencies and public relations of professional organizations\n\nThis class also includes:\n- activities of learned societies Explanatory Note Exclusion: This class excludes:\n- education provided by these organizations, see division 85",
	},
	{
		id: '49f4c661-1394-4116-a572-ea9b4d04b235',
		name: '2610:Manufacture of electronic components and boards',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2610 Description: Manufacture of electronic components and boards Explanatory Note Inclusion: This class includes the manufacture of semiconductors and other components for electronic applications. \n\nThis class includes:\n- manufacture of capacitors, electronic\n- manufacture of resistors, electronic\n- manufacture of microprocessors\n- manufacture of bare printed circuit boards \n- manufacture of electron tubes\n- manufacture of electronic connectors\n- manufacture of integrated circuits (analog, digital or hybrid)\n- manufacture of diodes, transistors and related discrete devices\n- manufacture of inductors (e.g. chokes, coils, transformers), electronic component type\n- manufacture of electronic crystals and crystal assemblies\n- manufacture of solenoids, switches and transducers for electronic applications\n- manufacture of dice or wafers, semiconductor, finished or semi-finished\n- manufacture of interface cards (e.g. sound, video, controllers, network, modems)\n- manufacture of display components (plasma, polymer, LCD)\n- manufacture of light emitting diodes (LED)\n- loading of components onto printed circuit boards\n\nThis class also includes:\n- manufacture of printer cables, monitor cables, USB cables, connectors etc. Explanatory Note Exclusion: This class excludes:\n- printing of smart cards, see 1811\n- manufacture of modems (carrier equipment), see 2630\n- manufacture of computer and television displays, see 2620, 2640\n- manufacture of X-ray tubes and similar irradiation devices, see 2660\n- manufacture of optical equipment and instruments, see 2670\n- manufacture of similar devices for electrical applications, see division 27\n- manufacture of lighting ballasts, see 2710\n- manufacture of electrical relays, see 2710\n- manufacture of electrical wiring devices, see 2733\n- manufacture of complete equipment is classified elsewhere based on complete equipment classification',
	},
	{
		id: '162fbec3-b8e6-4559-9ba3-11f5ed19f7a6',
		name: '10:Manufacture of food products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 10 Description: Manufacture of food products Explanatory Note Inclusion: This division includes the processing of the products of agriculture, forestry and fishing into food for humans or animals, and includes the production of various intermediate products that are not directly food products. The activity often generates associated products of greater or lesser value (for example, hides from slaughtering, or oilcake from oil production).\nThis division is organized by activities dealing with different kinds of products: meat, fish, fruit and vegetables, fats and oils, milk products, grain mill products, animal feeds and other food products. Production can be carried out for own account, as well as for third parties, as in custom slaughtering.\nSome activities are considered manufacturing (for example, those performed in bakeries, pastry shops, and prepared meat shops etc. which sell their own production) even though there is retail sale of the products in the producers' own shop. However, where the processing is minimal and does not lead to a real transformation, the unit is classified to Wholesale and retail trade (section G).\n\nProduction of animal feeds from slaughter waste or by-products is classified in 1080, while processing food and beverage waste into secondary raw material is classified to 3830, and disposal of food and beverage waste in 3821. Explanatory Note Exclusion: [Empty]",
	},
	{
		id: 'cb259203-e8e7-431e-822d-985ee83575c7',
		name: '8230:Organization of conventions and trade shows',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8230 Description: Organization of conventions and trade shows Explanatory Note Inclusion: This class includes:\n- organization, promotion and/or management of events, such as business and trade shows, conventions, conferences and meetings, whether or not including the management and provision of the staff to operate the facilities in which these events take place Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '24255989-3c98-4b18-839e-98bb1571c7cc',
		name: '2826:Manufacture of machinery for textile, apparel and leather production',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2826 Description: Manufacture of machinery for textile, apparel and leather production Explanatory Note Inclusion: This class includes:\n- manufacture of textile machinery:\n* machines for preparing, producing, extruding, drawing, texturing or cutting man-made textile fibres, materials or yarns\n* machines for preparing textile fibres: cotton gins, bale breakers, garnetters, cotton spreaders, wool scourers, wool carbonizers, combs, carders, roving frames etc.\n* spinning machines\n* machines for preparing textile yarns: reelers, warpers and related machines\n* weaving machines (looms), including hand looms\n* knitting machines\n* machines for making knotted net, tulle, lace, braid etc.\n- manufacture of auxiliary machines or equipment for textile machinery:\n* dobbies, jacquards, automatic stop motions, shuttle changing mechanisms, spindles and spindle flyers etc.\n- manufacture of textile printing machinery\n- manufacture of machinery for fabric processing:\n* machinery for washing, bleaching, dyeing, dressing, finishing, coating or impregnating textile fabrics\n* manufacture of machines for reeling, unreeling, folding, cutting or pinking textile fabrics\n- manufacture of laundry machinery:\n* ironing machines, including fusing presses\n* commercial washing and drying machines\n* dry-cleaning machines\n- manufacture of sewing machines, sewing machine heads and sewing machine needles (whether or not for household use)\n- manufacture of machines for producing or finishing felt or non-wovens\n- manufacture of leather machines:\n* machinery for preparing, tanning or working hides, skins or leather\n* machinery for making or repairing footwear or other articles of hides, skins, leather or fur skins Explanatory Note Exclusion: This class excludes:\n- manufacture of paper or paperboard cards for use on jacquard machines, see 1709\n- manufacture of domestic washing and drying machines, see 2750\n- manufacture of calendering machines, see 2819\n- manufacture of machines used in bookbinding, see 2829',
	},
	{
		id: '8457b895-1df1-4335-9796-32950912e5bf',
		name: '651:Insurance',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 651 Description: Insurance Explanatory Note Inclusion: This group includes life insurance and life reinsurance with or without a substantial savings element and other non-life insurance. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ab478599-2f59-4d14-a52c-719c9f5eaa4c',
		name: '3319:Repair of other equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3319 Description: Repair of other equipment Explanatory Note Inclusion: This class includes the repair and maintenance of equipment not covered in other groups of this division.\n\nThis class includes:\n- repair of fishing nets, including mending\n- repair or ropes, riggings, canvas and tarps\n- repair of fertilizer and chemical storage bags\n- repair or reconditioning of wooden pallets, shipping drums or barrels, and similar items\n- repair of pinball machines and other coin-operated games\n- restoring of organs and other historical musical instruments Explanatory Note Exclusion: This class excludes:\n- repair of household and office type furniture, furniture restoration, see 9524\n- repair of bicycles and invalid carriages, see 9529\n- repair and alteration of clothing, see 9529',
	},
	{
		id: '4a11cbd4-74bf-47fb-9fe5-6e97e3db136b',
		name: '2013:Manufacture of plastics and synthetic rubber in primary forms',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2013 Description: Manufacture of plastics and synthetic rubber in primary forms Explanatory Note Inclusion: This class includes the manufacture of resins, plastics materials and non-vulcanizable thermoplastic elastomers, the mixing and blending of resins on a custom basis, as well as the manufacture of non-customized synthetic resins.\n\nThis class includes:\n- manufacture of plastics in primary forms:\n* polymers, including those of ethylene, propylene, styrene, vinyl chloride, vinyl acetate and acrylics\n* polyamides\n* phenolic and epoxide resins and polyurethanes\n* alkyd and polyester resins and polyethers\n* silicones\n* ion-exchangers based on polymers\n- manufacture of synthetic rubber in primary forms:\n* synthetic rubber\n* factice\n- manufacture of mixtures of synthetic rubber and natural rubber or rubber-like gums (e.g. balata)\n\nThis class also includes:\n- manufacture of cellulose and its chemical derivatives Explanatory Note Exclusion: This class excludes:\n- manufacture of artificial and synthetic fibres, filaments and yarn, see 2030\n- shredding of plastic products, see 3830',
	},
	{
		id: '6450af70-8075-4acd-8760-cc04f327ff60',
		name: '2823:Manufacture of machinery for metallurgy',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2823 Description: Manufacture of machinery for metallurgy Explanatory Note Inclusion: This class includes:\n- manufacture of machines and equipment for handling hot metals:\n* converters, ingot moulds, ladles, casting machines\n- manufacture of metal-rolling mills and rolls for such mills Explanatory Note Exclusion: This class excludes:\n- manufacture of draw-benches, see 2822\n- manufacture of moulding boxes and moulds (except ingot moulds), see 2593\n- manufacture of machines for forming foundry moulds, see 2829',
	},
	{
		id: '6275758f-f899-4343-91c1-0237f636290d',
		name: '120:Manufacture of tobacco products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 120 Description: Manufacture of tobacco products Explanatory Note Inclusion: See class 1200. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd1a5808c-6d4a-4d8c-a748-b9fef65b7ed1',
		name: '4290:Construction of other civil engineering projects',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4290 Description: Construction of other civil engineering projects Explanatory Note Inclusion: This class includes:\n- construction of industrial facilities, except buildings, such as:\n* refineries\n* chemical plants\n- construction of:\n* waterways, harbour and river works, pleasure ports (marinas), locks, etc.\n* dams and dykes\n- dredging of waterways\n- construction work, other than buildings, such as:\n* outdoor sports facilities\n\nThis class also includes:\n- land subdivision with land improvement (e.g. adding of roads, utility infrastructure etc.) Explanatory Note Exclusion: This class excludes:\n- project management activities related to civil engineering works, see 7110',
	},
	{
		id: '81798da1-62d1-4d5c-a0d6-ac5a3fac520c',
		name: '243:Casting of metals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 243 Description: Casting of metals Explanatory Note Inclusion: This group includes the manufacture of semi-finished products and various castings by a casting process. Explanatory Note Exclusion: This group excludes:\n- manufacture of finished cast products such as:\n* boilers and radiators, see 2512\n* cast household items, see 2599',
	},
	{
		id: '694d2759-69ab-4519-98e2-a3688bf7d823',
		name: '282:Manufacture of special-purpose machinery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 282 Description: Manufacture of special-purpose machinery Explanatory Note Inclusion: This group includes the manufacture of special-purpose machinery, i.e. machinery for exclusive use in an ISIC industry or a small cluster of ISIC industries. While most of these are used in other manufacturing processes, such as food manufacturing or textile manufacturing, this group also includes the manufacture of machinery specific for other (non-manufacturing industries), such as aircraft launching gear or amusement park equipment. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e2e1f67d-3393-4182-86f6-1ada2f77c3e5',
		name: '0111:Growing of cereals (except rice), leguminous crops and oil seeds',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0111 Description: Growing of cereals (except rice), leguminous crops and oil seeds Explanatory Note Inclusion: This class includes all forms of growing of cereals, leguminous crops and oil seeds in open fields, including those considered organic farming and the growing of genetically modified crops. The growing of these crops is often combined within agricultural units.\n\nThis class includes:\n- growing of cereals such as:\n* wheat\n* grain maize\n* sorghum\n* barley\n* rye\n* oats\n* millets\n* other cereals n.e.c.\n- growing of leguminous crops such as:\n* beans\n* broad beans\n* chick peas\n* cow peas\n* lentils\n* lupins\n* peas\n* pigeon peas\n* other leguminous crops\n- growing of oil seeds such as:\n* soya beans\n* groundnuts\n* castor bean\n* linseed\n* mustard seed\n* niger seed\n* rapeseed\n* safflower seed\n* sesame seed\n* sunflower seed\n* other oil seeds Explanatory Note Exclusion: This class excludes:\n- growing of maize for fodder, see 0119',
	},
	{
		id: '8c641b66-db2b-4f3d-bb5c-bc639960fa74',
		name: '1102:Manufacture of wines',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1102 Description: Manufacture of wines Explanatory Note Inclusion: This class includes:\n- manufacture of wine\n- manufacture of sparkling wine\n- manufacture of wine from concentrated grape must\n- manufacture of fermented but not distilled alcoholic beverages: sake, cider, perry, mead, other fruit wines and mixed beverages containing alcohol\n- manufacture of vermouth and the like\n\nThis class also includes:\n- blending of wine\n- manufacture of low or non-alcoholic wine Explanatory Note Exclusion: This class excludes:\n- manufacture of vinegar, see 1079\n- merely bottling and labeling, see 4630 (if performed as part of wholesale) and 8292 (if performed on a fee or contract basis)',
	},
	{
		id: '4f820c8c-d6e4-45a0-ab79-674d86014bcf',
		name: '429:Construction of other civil engineering projects',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 429 Description: Construction of other civil engineering projects Explanatory Note Inclusion: See class 4290. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '01c46aed-f5d1-4428-8f0a-52a590cfa278',
		name: '0141:Raising of cattle and buffaloes',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0141 Description: Raising of cattle and buffaloes Explanatory Note Inclusion: This class includes:\n- raising and breeding of cattle and buffaloes\n- production of raw cow milk from cows or buffaloes\n- production of bovine semen Explanatory Note Exclusion: This class excludes:\n- processing of milk, see 1050',
	},
	{
		id: '890a4180-9426-49f0-a088-b0ff3aaf8f27',
		name: '0130:Plant propagation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0130 Description: Plant propagation Explanatory Note Inclusion: This class includes the production of all vegetative planting materials including cuttings, suckers and seedlings for direct plant propagation or to create plant grafting stock into which selected scion is grafted for eventual planting to produce crops.\n\nThis class includes:\n- growing of plants for planting\n- growing of plants for ornamental purposes, including turf for transplanting\n- growing of live plants for bulbs, tubers and roots; cuttings and slips; mushroom spawn \n- operation of tree nurseries, except forest tree nurseries Explanatory Note Exclusion: This class excludes:\n- growing of plants for the purpose of seed production, see groups 011 and 012\n- operation of forest tree nurseries, see 0210',
	},
	{
		id: 'b16f14a4-7c17-4969-a5b6-16c4ebbe1af7',
		name: '1062:Manufacture of starches and starch products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1062 Description: Manufacture of starches and starch products Explanatory Note Inclusion: This class includes:\n- manufacture of starches from rice, potatoes, maize etc.\n- wet corn milling\n- manufacture of glucose, glucose syrup, maltose, inulin etc.\n- manufacture of gluten\n- manufacture of tapioca and tapioca substitutes prepared from starch\n- manufacture of corn oil Explanatory Note Exclusion: This class excludes:\n- manufacture of lactose (milk sugar), see 1050\n- production of cane or beet sugar, see 1072',
	},
	{
		id: '89670cd7-c183-4e30-a778-98a24759ba10',
		name: '6209:Other information technology and computer service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6209 Description: Other information technology and computer service activities Explanatory Note Inclusion: This class includes other information technology and computer related activities not elsewhere classified, such as:\n- computer disaster recovery\n- installation (setting-up) of personal computers\n- software installation Explanatory Note Exclusion: This class excludes:\n- installation of mainframe and similar computers, see 3320\n- computer programming, see 6201\n- computer consultancy, see 6202\n- computer facilities management, see 6202\n- data processing and hosting, see 6311',
	},
	{
		id: 'c13be2c0-c28c-4369-ad45-94ae1281bf18',
		name: '559:Other accommodation',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 559 Description: Other accommodation Explanatory Note Inclusion: See class 5590. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '6012a547-1eb7-48ec-a599-24f231eb16e1',
		name: '49:Land transport and transport via pipelines',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 49 Description: Land transport and transport via pipelines Explanatory Note Inclusion: This division includes the transport of passengers and freight via road and rail, as well as freight transport via pipelines. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'dd557ca3-7e21-47ae-abb8-b48eebd15972',
		name: '7420:Photographic activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7420 Description: Photographic activities Explanatory Note Inclusion: This class includes:\n- commercial and consumer photograph production:\n* portrait photography for passports, schools, weddings etc.\n* photography for commercials, publishers, fashion, real estate or tourism purposes\n* aerial photography \n* videotaping of events: weddings, meetings etc.\n- film processing:\n* developing, printing and enlarging from client-taken negatives or cine-films\n* film developing and photo printing laboratories \n* one hour photo shops (not part of camera stores)\n* mounting of slides\n* copying and restoring or transparency retouching in connection with photographs\n- activities of photojournalists\n\nThis class also includes:\n- microfilming of documents Explanatory Note Exclusion: This class excludes:\n- processing motion picture film related to the motion picture and television industries, see 5912\n- cartographic and spatial information activities, see 7110',
	},
	{
		id: 'accfaea8-70b2-4859-b49f-0fd0c02dabdd',
		name: '9511:Repair of computers and peripheral equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 9511 Description: Repair of computers and peripheral equipment Explanatory Note Inclusion: This class includes the repair of electronic equipment, such as computers and computing machinery and peripheral equipment.\n\nThis class includes:\n- repair and maintenance of:\n* desktop computers\n* laptop computers\n* magnetic disk drives, flash drives and other storage devices\n* optical disk drives (CD-RW, CD-ROM, DVD-ROM, DVD-RW)\n* printers\n* monitors\n* keyboards\n* mice, joysticks and trackball accessories\n* internal and external computer modems\n* dedicated computer terminals\n* computer servers\n* scanners, including bar code scanners\n* smart card readers\n* virtual reality helmets\n* computer projectors\n\nThis class also includes:\n- repair and maintenance of:\n* computer terminals like automatic teller machines (ATM's); point-of-sale (POS) terminals, not mechanically operated\n* hand-held computers (PDA's) Explanatory Note Exclusion: This class excludes:\n- repair and maintenance of carrier equipment modems, see 9512",
	},
	{
		id: '52800990-cf8a-4a12-b764-1b1a6e93a6b5',
		name: 'I:Accommodation and food service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: I Description: Accommodation and food service activities Explanatory Note Inclusion: This section includes the provision of short-stay accommodation for visitors and other travellers and the provision of complete meals and drinks fit for immediate consumption. The amount and type of supplementary services provided within this section can vary widely.\n\nThis section excludes the provision of long-term accommodation as primary residences, which is classified in Real estate activities (section L). Also excluded is the preparation of food or drinks that are either not fit for immediate consumption or that are sold through independent distribution channels, i.e. through wholesale or retail trade activities. The preparation of these foods is classified in Manufacturing (section C). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'bc3c08fb-8e05-4815-b50e-6968203560f7',
		name: '854:Other education',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 854 Description: Other education Explanatory Note Inclusion: This group includes general continuing education and continuing vocational education and training for any profession. Instruction may be oral or written and may be provided in classrooms or by radio, television, Internet, correspondence or other means of communication. This group also includes the provision of instruction in athletic activities to groups or individuals, foreign language instruction, instruction in the arts, drama or music or other instruction or specialized training, not comparable to the education in groups 851 - 853. Explanatory Note Exclusion: This group excludes:\n- provision of primary education, secondary education or higher education, see groups 851, 852, 853',
	},
	{
		id: '7135a056-feda-40af-abaf-5dc665517f0e',
		name: '6820:Real estate activities on a fee or contract basis',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6820 Description: Real estate activities on a fee or contract basis Explanatory Note Inclusion: This class includes the provision of real estate activities on a fee or contract basis including real estate related services.\n\nThis class includes:\n- activities of real estate agents and brokers\n- intermediation in buying, selling and renting of real estate on a fee or contract basis\n- management of real estate on a fee or contract basis\n- appraisal services for real estate\n- activities of real estate escrow agents Explanatory Note Exclusion: This class excludes:\n- legal activities, see 6910\n- facilities support services, see 8110\n- management of facilities, such as military bases, prisons and other facilities (except computer facilities management), see 8110',
	},
	{
		id: 'cf187d09-9033-4ef5-9ff1-0db820644b58',
		name: '1312:Weaving of textiles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1312 Description: Weaving of textiles Explanatory Note Inclusion: This class includes:\n- manufacture of broad woven cotton-type, woollen-type, worsted-type or silk-type fabrics, including from mixtures or artificial or synthetic yarns\n- manufacture of other broad woven fabrics, using flax, ramie, hemp, jute, bast fibres and special yarns\n\nThis class also includes:\n- manufacture of woven pile or chenille fabrics, terry towelling, gauze etc.\n- manufacture of woven fabrics of glass fibres\n- manufacture of woven fabrics of carbon and aramid threads\n- manufacture of imitation fur by weaving Explanatory Note Exclusion: This class excludes:\n- manufacture of knitted and crocheted fabrics, see 1391\n- manufacture of textile floor coverings, see 1393\n- manufacture of non-woven fabrics and felts, see 1399\n- manufacture of narrow fabrics, see 1399',
	},
	{
		id: '7336b5a4-24ac-4335-bffe-518599c76122',
		name: '1200:Manufacture of tobacco products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1200 Description: Manufacture of tobacco products Explanatory Note Inclusion: This class includes:\n- manufacture of tobacco products and products of tobacco substitutes: cigarettes, cigarette tobacco, cigars, pipe tobacco, chewing tobacco, snuff\n- manufacture of "homogenized" or "reconstituted" tobacco\n\nThis class also includes:\n- stemming and redrying of tobacco Explanatory Note Exclusion: This class excludes:\n- growing or preliminary processing of tobacco, see 0115, 0163',
	},
	{
		id: '78ce8b0a-a978-4739-842a-8f66e44d4613',
		name: '422:Construction of utility projects',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 422 Description: Construction of utility projects Explanatory Note Inclusion: See class 4220. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '38b98781-598c-4791-8b41-d9c15c039016',
		name: '014:Animal production',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 014 Description: Animal production Explanatory Note Inclusion: This group includes raising (farming) and breeding of all animals, except aquatic animals. Explanatory Note Exclusion: This group excludes:\n- breeding support services, such as stud services, see 0162\n- farm animal boarding and care, see 0162\n- production of hides and skins from slaughterhouses, see 1010',
	},
	{
		id: 'e9c88244-2e20-44b2-9c6a-ec3a6dcde2b6',
		name: '62:Computer programming, consultancy and related activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 62 Description: Computer programming, consultancy and related activities Explanatory Note Inclusion: This division includes the following activities of providing expertise in the field of information technologies: writing, modifying, testing and supporting software; planning and designing computer systems that integrate computer hardware, software and communication technologies; on-site management and operation of clients' computer systems and/or data processing facilities; and other professional and technical computer-related activities. Explanatory Note Exclusion: [Empty]",
	},
	{
		id: 'e5ab3d0d-209a-4975-99c4-8c3976f3292d',
		name: '4711:Retail sale in non-specialized stores with food, beverages or tobacco predo',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4711 Description: Retail sale in non-specialized stores with food, beverages or tobacco predominating Explanatory Note Inclusion: This class includes:\n- retail sale of a large variety of goods of which, however, food products, beverages or tobacco should be predominant, such as:\n* retail sale activities of general stores that have, apart from their main sales of food products, beverages or tobacco, several other types of goods such as wearing apparel, furniture, appliances, hardware, cosmetics etc. Explanatory Note Exclusion: This class excludes:\n- retail sale of fuel in combination with food, beverages etc., with fuel sales dominating, see 4730',
	},
	{
		id: '45e5109b-2e52-4364-9c9c-aea5c5e39fdb',
		name: '052:Mining of lignite',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 052 Description: Mining of lignite Explanatory Note Inclusion: See class 0520. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5a150585-7f15-44e9-84fa-b5a481ce6ca7',
		name: 'M69-M70: Legal and accounting activities; activities of head offices; management consultancy activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Legal and accounting activities; activities of head offices; management consultancy activities',
	},
	{
		id: '3008298d-78b7-4907-95ac-fe42088d0f7f',
		name: '8430:Compulsory social security activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8430 Description: Compulsory social security activities Explanatory Note Inclusion: This class includes:\n- funding and administration of government-provided social security programmes:\n* sickness, work-accident and unemployment insurance\n* retirement pensions\n* programmes covering losses of income due to maternity, temporary disablement, widowhood etc. Explanatory Note Exclusion: This class excludes:\n- non-compulsory social security, see 6530\n- provision of welfare services and social work (without accommodation), see 8810, 8890',
	},
	{
		id: 'b871f6a1-7cb3-4498-8a68-fee57ec52520',
		name: '1040:Manufacture of vegetable and animal oils and fats',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1040 Description: Manufacture of vegetable and animal oils and fats Explanatory Note Inclusion: This class includes the manufacture of crude and refined oils and fats from vegetable or animal materials, except rendering or refining of lard and other edible animal fats.\n\nThis class includes:\n- manufacture of crude vegetable oils: olive oil, soya-bean oil, palm oil, sunflower-seed oil, cotton-seed oil, rape, colza or mustard oil, linseed oil etc.\n- manufacture of non-defatted flour or meal of oilseeds, oil nuts or oil kernels\n- manufacture of refined vegetable oils: olive oil, soya-bean oil etc.\n- processing of vegetable oils: blowing, boiling, dehydration, hydrogenation etc.\n- manufacture of margarine\n- manufacture of melanges and similar spreads\n- manufacture of compound cooking fats\n\nThis class also includes:\n- manufacture of non-edible animal oils and fats\n- extraction of fish and marine mammal oils\n- production of cotton linters, oilcakes and other residual products of oil production Explanatory Note Exclusion: This class excludes:\n- rendering and refining of lard and other edible animal fats, see 1010\n- wet corn milling, see 1062\n- production of essential oils, see 2029\n- treatment of oil and fats by chemical processes, see 2029',
	},
	{
		id: 'fb9a6a31-ef0a-4542-ab6c-67487f4f196f',
		name: '1020:Processing and preserving of fish, crustaceans and molluscs',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1020 Description: Processing and preserving of fish, crustaceans and molluscs Explanatory Note Inclusion: This class includes:\n- preparation and preservation of fish, crustaceans and molluscs: freezing, deep-freezing, drying, smoking, salting, immersing in brine, canning etc.\n- production of fish, crustacean and mollusc products: cooked fish, fish fillets, roes, caviar, caviar substitutes etc.\n- production of fishmeal for human consumption or animal feed\n- production of meals and solubles from fish and other aquatic animals unfit for human consumption\n\nThis class also includes:\n- activities of vessels engaged only in the processing and preserving of fish\n- processing of seaweed Explanatory Note Exclusion: This class excludes:\n- processing of whales on land or specialized vessels, see 1010\n- production of oils and fats from marine material, see 1040\n- manufacture of prepared frozen fish dishes, see 1075\n- manufacture of fish soups, see 1079',
	},
	{
		id: '976e52e9-819b-42da-882c-78c3fa0b3946',
		name: '813:Landscape care and maintenance service activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 813 Description: Landscape care and maintenance service activities Explanatory Note Inclusion: See class 8130. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2fc70895-91b4-48a7-a362-8b22623ba3a4',
		name: '0311:Marine fishing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0311 Description: Marine fishing Explanatory Note Inclusion: This class includes:\n- fishing on a commercial basis in ocean and coastal waters\n- taking of marine crustaceans and molluscs\n- whale catching\n- taking of marine aquatic animals: turtles, sea squirts, tunicates, sea urchins etc.\n\nThis class also includes:\n- activities of vessels engaged both in fishing and in processing and preserving of fish\n- gathering of other marine organisms and materials: natural pearls, sponges, coral and algae Explanatory Note Exclusion: This class excludes:\n- capturing of marine mammals, except whales, e.g. walruses, seals, see 0170\n- processing of fish, crustaceans and molluscs on factory ships or in factories ashore, see 1020\n- renting of pleasure boats with crew for sea and coastal water transport (e.g. for fishing cruises), see 5011\n- fishing inspection, protection and patrol services, see 8423\n- fishing practiced for sport or recreation and related services, see 9319\n- operation of sport fishing preserves, see 9319',
	},
	{
		id: '983cc3f1-04f8-484a-a806-6230c93ae82b',
		name: '478:Retail sale via stalls and markets',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 478 Description: Retail sale via stalls and markets Explanatory Note Inclusion: This group includes the retail sale of any kind of new or second hand product in a usually movable stall either along a public road or at a fixed marketplace. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a6851861-0dbf-4c6b-9a9e-0449b53acf90',
		name: '46:Wholesale trade, except of motor vehicles and motorcycles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 46 Description: Wholesale trade, except of motor vehicles and motorcycles Explanatory Note Inclusion: This division includes wholesale trade on own account or on a fee or contract basis (commission trade) related to domestic wholesale trade as well as international wholesale trade (import/export).\n\nWholesale is the resale (sale without transformation) of new and used goods to retailers, business-to-business trade, such as to industrial, commercial, institutional or professional users, or resale to other wholesalers, or involves acting as an agent or broker in buying goods for, or selling goods to, such persons or companies. The principal types of businesses included are merchant wholesalers, i.e. wholesalers who take title to the goods they sell, such as wholesale merchants or jobbers, industrial distributors, exporters, importers, and cooperative buying associations, sales branches and sales offices (but not retail stores) that are maintained by manufacturing or mining units apart from their plants or mines for the purpose of marketing their products and that do not merely take orders to be filled by direct shipments from the plants or mines. Also included are merchandise brokers, commission merchants and agents and assemblers, buyers and cooperative associations engaged in the marketing of farm products.\n\nWholesalers frequently physically assemble, sort and grade goods in large lots, break bulk, repack and redistribute in smaller lots, for example pharmaceuticals; store, refrigerate, deliver and install goods, engage in sales promotion for their customers and label design.\n\nThis division excludes the wholesale of motor vehicles, caravans and motorcycles, as well as motor vehicle accessories (see division 45), the renting and leasing of goods (see division 77) and the packing of solid goods and bottling of liquid or gaseous goods, including blending and filtering, for third parties (see class 8292). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c7e95e3d-1412-4a9f-bfd9-4cf1335486d2',
		name: '643:Trusts, funds and similar financial entities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 643 Description: Trusts, funds and similar financial entities Explanatory Note Inclusion: See class 6430. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '3ab51133-f254-4fb0-b577-e17c7a393234',
		name: '97:Activities of households as employers of domestic personnel',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 97 Description: Activities of households as employers of domestic personnel Explanatory Note Inclusion: See class 9700. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b0aef80c-272e-4a80-bab4-018983708961',
		name: '25:Manufacture of fabricated metal products, except machinery and equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 25 Description: Manufacture of fabricated metal products, except machinery and equipment Explanatory Note Inclusion: This division includes the manufacture of "pure" metal products (such as parts, containers and structures), usually with a static, immovable function, as opposed to the following divisions 26-30, which cover the manufacture of combinations or assemblies of such metal products (sometimes with other materials) into more complex units that, unless they are purely electrical, electronic or optical, work with moving parts.\nThe manufacture of weapons and ammunition is also included in this division.\n\nThis division excludes specialized repair and maintenance activities (see group 331) and the specialized installation of manufactured goods produced in this division in buildings, such as central heating boilers (see 4322). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd52420ed-011d-490e-a64e-0b05a0181f1b',
		name: '0122:Growing of tropical and subtropical fruits',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0122 Description: Growing of tropical and subtropical fruits Explanatory Note Inclusion: This class includes:\n- growing of tropical and subtropical fruits:\n* avocados\n* bananas and plantains\n* dates\n* figs\n* mangoes\n* papayas\n* pineapples\n* other tropical and subtropical fruits Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7a472282-0df8-4bb7-8a98-e2cadd137ca2',
		name: '6110:Wired telecommunications activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6110 Description: Wired telecommunications activities Explanatory Note Inclusion: This class includes:\n- operating, maintaining or providing access to facilities for the transmission of voice, data, text, sound and video using a wired telecommunications infrastructure, including:\n* operating and maintaining switching and transmission facilities to provide point-to-point communications via landlines, microwave or a combination of landlines and satellite linkups\n* operating of cable distribution systems (e.g. for distribution of data and television signals)\n* furnishing telegraph and other non-vocal communications using own facilities\n\nThe transmission facilities that carry out these activities, may be based on a single technology or a combination of technologies. \n\nThis class also includes:\n- purchasing access and network capacity from owners and operators of networks and providing telecommunications services using this capacity to businesses and households\n- provision of Internet access by the operator of the wired infrastructure Explanatory Note Exclusion: This class excludes:\n- telecommunications resellers, see 6190',
	},
	{
		id: '934d8bd3-2884-4223-80a1-833ec7148448',
		name: '4663:Wholesale of construction materials, hardware, plumbing and heating equipme',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4663 Description: Wholesale of construction materials, hardware, plumbing and heating equipment and supplies Explanatory Note Inclusion: This class includes:\n- wholesale of wood in the rough\n- wholesale of products of primary processing of wood\n- wholesale of paint and varnish\n- wholesale of construction materials:\n* sand, gravel\n- wholesale of wallpaper and floor coverings\n- wholesale of flat glass\n- wholesale of hardware and locks\n- wholesale of fittings and fixtures\n- wholesale of hot water heaters\n- wholesale of sanitary equipment:\n* baths, washbasins, toilets and other sanitary porcelain\n- wholesale of sanitary installation equipment:\n* tubes, pipes, fittings, taps, T-pieces, connections, rubber pipes etc.\n- wholesale of tools such as hammers, saws, screwdrivers and other hand tools Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c11744dd-1e59-4c33-a1f0-e1e41077d8da',
		name: '4329:Other construction installation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4329 Description: Other construction installation Explanatory Note Inclusion: This class includes the installation of equipment other than electrical, plumbing, heating and air-conditioning systems or industrial machinery in buildings and civil engineering structures, including maintenance and repair.\n\nThis class includes:\n- installation in buildings or other construction projects of:\n* elevators, escalators\n* automated and revolving doors\n* lightning conductors\n* vacuum cleaning systems\n* thermal, sound or vibration insulation Explanatory Note Exclusion: This class excludes:\n- installation of industrial machinery, see 3320',
	},
	{
		id: '5682ee05-067a-4dd3-a2b5-93f3f1d25c75',
		name: '1702:Manufacture of corrugated paper and paperboard and of containers of paper a',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1702 Description: Manufacture of corrugated paper and paperboard and of containers of paper and paperboard Explanatory Note Inclusion: This class includes:\n- manufacture of corrugated paper and paperboard\n- manufacture of containers of corrugated paper or paperboard\n- manufacture of folding paperboard containers\n- manufacture of containers of solid board\n- manufacture of other containers of paper and paperboard\n- manufacture of sacks and bags of paper\n- manufacture of office box files and similar articles Explanatory Note Exclusion: This class excludes:\n- manufacture of envelopes, see 1709\n- manufacture of moulded or pressed articles of paper pulp (e.g. boxes for packing eggs, moulded pulp paper plates), see 1709',
	},
	{
		id: 'f9b3d689-7fed-4e91-8a1b-88f29c6ff805',
		name: '8423:Public order and safety activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8423 Description: Public order and safety activities Explanatory Note Inclusion: This class includes:\n- administration and operation of regular and auxiliary police forces supported by public authorities and of port, border, coastguards and other special police forces, including traffic regulation, alien registration, maintenance of arrest records\n- firefighting and fire prevention:\n* administration and operation of regular and auxiliary fire brigades in fire prevention, firefighting, rescue of persons and animals, assistance in civic disasters, floods, road accidents etc. \n- administration and operation of administrative civil and criminal law courts, military tribunals and the judicial system, including legal representation and advice on behalf of the government or when provided by the government in cash or services\n- rendering of judgements and interpretations of the law\n- arbitration of civil actions\n- prison administration and provision of correctional services, including rehabilitation services, regardless of whether their administration and operation is done by government units or by private units on a contract or fee basis\n- provision of supplies for domestic emergency use in case of peacetime disasters Explanatory Note Exclusion: This class excludes:\n- forestry fire-protection and fire-fighting services, see 0240\n- oil and gas field fire fighting, see 0910\n- firefighting and fire-prevention services at airports provided by non-specialized units, see 5223\n- advice and representation in civil, criminal and other cases, see 6910\n- operation of police laboratories, see 7120\n- administration and operation of military armed forces, see 8422\n- activities of prison schools, see division 85\n- activities of prison hospitals, see 8610',
	},
	{
		id: 'f4eb401a-04f9-4f8f-8dcb-1ce1397fbec5',
		name: '6130:Satellite telecommunications activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6130 Description: Satellite telecommunications activities Explanatory Note Inclusion: This class includes:\n- operating, maintaining or providing access to facilities for the transmission of voice, data, text, sound and video using a satellite telecommunications infrastructure\n- delivery of visual, aural or textual programming received from cable networks, local television stations or radio networks to consumers via direct-to-home satellite systems (The units classified here do not generally originate programming material.)\n\nThis class also includes:\n- provision of Internet access by the operator of the satellite infrastructure Explanatory Note Exclusion: This class excludes:\n- telecommunications resellers, see 6190',
	},
	{
		id: '045c67ac-55a6-47c5-81b6-714eb8607939',
		name: '2310:Manufacture of glass and glass products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2310 Description: Manufacture of glass and glass products Explanatory Note Inclusion: This class includes the manufacture of glass in all forms, made by any process and the manufacture of articles of glass.\n\nThis class includes:\n- manufacture of flat glass, including wired, coloured or tinted flat glass\n- manufacture of toughened or laminated flat glass\n- manufacture of glass in rods or tubes\n- manufacture of glass paving blocks\n- manufacture of glass mirrors\n- manufacture of multiple-walled insulating units of glass\n- manufacture of bottles and other containers of glass or crystal\n- manufacture of drinking glasses and other domestic glass or crystal articles\n- manufacture of glass fibres, including glass wool and non-woven products thereof\n- manufacture of laboratory, hygienic or pharmaceutical glassware\n- manufacture of clock or watch glasses, optical glass and optical elements not optically worked\n- manufacture of glassware used in imitation jewellery\n- manufacture of glass insulators and glass insulating fittings\n- manufacture of glass envelopes for lamps\n- manufacture of glass figurines Explanatory Note Exclusion: This class excludes:\n- manufacture of woven fabrics of glass yarn, see 1312\n- manufacture of optical elements optically worked, see 2670\n- manufacture of fiber optic cable for data transmission or live transmission of images, see 2731\n- manufacture of glass toys, see 3240\n- manufacture of syringes and other medical laboratory equipment, see 3250',
	},
	{
		id: 'a2cd03ca-db6f-4537-82c1-9b1b90cf2b29',
		name: '4764:Retail sale of games and toys in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4764 Description: Retail sale of games and toys in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of games and toys, made of all materials Explanatory Note Exclusion: This class excludes:\n- retail sale of video game consoles, see 4741\n- retail sale of non-customized software, including video games, see 4741',
	},
	{
		id: '3789a3a4-ec50-4781-b51e-70fca6b3e8c2',
		name: '323:Manufacture of sports goods',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 323 Description: Manufacture of sports goods Explanatory Note Inclusion: See class 3230. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '295a5ca7-e13a-474a-be2f-dfabd34abd23',
		name: '4742:Retail sale of audio and video equipment in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4742 Description: Retail sale of audio and video equipment in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of radio and television equipment\n- retail sale of stereo equipment\n- retail sale of CD and DVD players and recorders Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'be2185c2-c386-4fea-9567-05fb5d9876a4',
		name: '6399:Other information service activities n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6399 Description: Other information service activities n.e.c. Explanatory Note Inclusion: This class includes other information service activities not elsewhere classified, such as:\n- telephone based information services\n- information search services on a contract or fee basis\n- news clipping services, press clipping services, etc. Explanatory Note Exclusion: This class excludes:\n- activities of call centers, see 8220',
	},
	{
		id: '0f415ee8-1520-4650-a44a-ec7d78c7d47d',
		name: '561:Restaurants and mobile food service activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 561 Description: Restaurants and mobile food service activities Explanatory Note Inclusion: See class 5610. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c849382c-86cb-4e65-8821-868766d78b1f',
		name: '4311:Demolition',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4311 Description: Demolition Explanatory Note Inclusion: This class includes:\n- demolition or wrecking of buildings and other structures Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd425e322-a773-477f-9576-279607d45e8c',
		name: 'T:Activities of households as employers; undifferentiated goods- and services-pr',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: T Description: Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use Explanatory Note Inclusion: [Empty] Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '98b4dfa6-729e-4396-b6e3-c7084bd9edf4',
		name: '241:Manufacture of basic iron and steel',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 241 Description: Manufacture of basic iron and steel Explanatory Note Inclusion: See class 2410. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e0ddd566-d513-4ced-9f14-5aebd8bdfaf1',
		name: '170:Manufacture of paper and paper products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 170 Description: Manufacture of paper and paper products Explanatory Note Inclusion: See division 17. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0f129367-aabd-4253-845e-2a5f1cd32771',
		name: '4540:Sale, maintenance and repair of motorcycles and related parts and accessori',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4540 Description: Sale, maintenance and repair of motorcycles and related parts and accessories Explanatory Note Inclusion: This class includes:\n- wholesale and retail sale of motorcycles, including mopeds\n- wholesale and retail sale of parts and accessories for motorcycles (including by commission agents and mail order houses)\n- maintenance and repair of motorcycles Explanatory Note Exclusion: This class excludes:\n- wholesale of bicycles and related parts and accessories, see 4649\n- retail sale of bicycles and related parts and accessories, see 4763\n- renting of motorcycles, see 7730\n- repair and maintenance of bicycles, see 9529',
	},
	{
		id: '01256ef2-49fc-4a7b-9a32-a2af90af8355',
		name: '23:Manufacture of other non-metallic mineral products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 23 Description: Manufacture of other non-metallic mineral products Explanatory Note Inclusion: This division includes manufacturing activities related to a single substance of mineral origin. This division includes the manufacture of glass and glass products (e.g. flat glass, hollow glass, fibres, technical glassware etc.), ceramic products, tiles and baked clay products, and cement and plaster, from raw materials to finished articles. The manufacture of shaped and finished stone and other mineral products is also included in this division. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '61c90fa5-1165-400d-b60d-9e58bb3fd05c',
		name: '4771:Retail sale of clothing, footwear and leather articles in specialized store',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4771 Description: Retail sale of clothing, footwear and leather articles in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of articles of clothing\n- retail sale of articles of fur\n- retail sale of clothing accessories such as gloves, ties, braces etc.\n- retail sale of umbrellas\n- retail sale of footwear\n- retail sale of leather goods\n- retail sale of travel accessories of leather and leather substitutes Explanatory Note Exclusion: This class excludes:\n- retail sale of textiles, see 4751',
	},
	{
		id: '18ac363d-2303-4e13-929a-77b69cf64c90',
		name: '613:Satellite telecommunications activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 613 Description: Satellite telecommunications activities Explanatory Note Inclusion: See class 6130. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '1410534d-1e3f-4828-acb3-785630d3a8e5',
		name: '951:Repair of computers and communication equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 951 Description: Repair of computers and communication equipment Explanatory Note Inclusion: This group includes the repair and maintenance of computers and peripheral equipment and communications equipment. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c43cae4f-e44c-4421-8e79-26b67eecc3e2',
		name: '1511:Tanning and dressing of leather; dressing and dyeing of fur',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1511 Description: Tanning and dressing of leather; dressing and dyeing of fur Explanatory Note Inclusion: This class includes:\n- tanning, dyeing and dressing of hides and skins\n- manufacture of chamois dressed, parchment dressed, patent or metallized leathers\n- manufacture of composition leather\n- scraping, shearing, plucking, currying, tanning, bleaching and dyeing of fur skins and hides with the hair on Explanatory Note Exclusion: This class excludes:\n- production of hides and skins as part of ranching, see group 014\n- production of hides and skins as part of slaughtering, see 1010\n- manufacture of leather apparel, see 1410\n- manufacture of imitation leather not based on natural leather, see 2219, 2220',
	},
	{
		id: '820f3074-cdf3-4343-9a67-4b33992cc7e9',
		name: '22:Manufacture of rubber and plastics products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 22 Description: Manufacture of rubber and plastics products Explanatory Note Inclusion: This division includes the manufacture of rubber and plastics products. \nThis division is characterized by the raw materials used in the manufacturing process. However, this does not imply that the manufacture of all products made of these materials is classified here. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '6ad5cd9d-daa4-43f9-94d2-8c9d951ccfcf',
		name: '731:Advertising',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 731 Description: Advertising Explanatory Note Inclusion: See class 7310. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5306b4f0-e58a-4267-9861-472be1305f17',
		name: '304:Manufacture of military fighting vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 304 Description: Manufacture of military fighting vehicles Explanatory Note Inclusion: See class 3040. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7b5492b2-862b-4638-a857-736545026eea',
		name: '9492:Activities of political organizations',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 9492 Description: Activities of political organizations Explanatory Note Inclusion: This class includes:\n- activities of political organizations and auxiliary organizations such as young people's auxiliaries associated with a political party. These organizations chiefly engage in influencing decision-taking in public governing bodies by placing members of the party or those sympathetic to the party in political office and involve the dissemination of information, public relations, fund-raising etc. Explanatory Note Exclusion: [Empty]",
	},
	{
		id: 'a4cc2905-689e-44f1-8a41-2e068c182bda',
		name: '9529:Repair of other personal and household goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9529 Description: Repair of other personal and household goods Explanatory Note Inclusion: This class includes:\n- repair of bicycles\n- repair and alteration of clothing\n- repair and alteration of jewellery\n- repair of watches, clocks and their parts such as watchcases and housings of all materials; movements, chronometers, etc.\n- repair of sporting goods (except sporting guns)\n- repair of books\n- repair of musical instruments\n- repair of toys and similar articles\n- repair of other personal and household goods\n- piano-tuning Explanatory Note Exclusion: This class excludes:\n- industrial engraving of metals, see 2592\n- repair of sporting and recreational guns, see 3311\n- repair of hand held power tools, see 3312\n- repair of time clocks, time/date stamps, time locks and similar time recording devices, see 3313',
	},
	{
		id: '24cccce7-aae3-4f90-99b4-1dbab49be2a9',
		name: '271:Manufacture of electric motors, generators, transformers and electricity dis',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 271 Description: Manufacture of electric motors, generators, transformers and electricity distribution and control apparatus Explanatory Note Inclusion: See class 2710. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '30a7b15a-897f-4f06-82cb-3c431962b3b1',
		name: '6492:Other credit granting',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6492 Description: Other credit granting Explanatory Note Inclusion: This class includes:\n- financial service activities primarily concerned with making loans by institutions not involved in monetary intermediation, where the granting of credit can take a variety of forms, such as loans, mortgages, credit cards etc., providing the following types of services:\n* granting of consumer credit\n* international trade financing\n* provision of long-term finance to industry by industrial banks\n* money lending outside the banking system\n* credit granting for house purchase by specialized non-depository institutions\n* pawnshops and pawnbrokers Explanatory Note Exclusion: This class excludes:\n- credit granting for house purchase by specialized institutions that also take deposits, see 6419\n- operational leasing, see division 77, according to type of goods leased\n- grant-giving activities by membership organizations, see 9499',
	},
	{
		id: 'b40d3d68-0a56-4a25-a84e-13504c42c4bf',
		name: '465:Wholesale of machinery, equipment and supplies',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 465 Description: Wholesale of machinery, equipment and supplies Explanatory Note Inclusion: This group includes the wholesale of computers, telecommunications equipment, specialized machinery for all kinds of industries and general-purpose machinery. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'c5c39a11-8860-4d18-98b8-7d627e3b89fc',
		name: '259:Manufacture of other fabricated metal products; metalworking service activit',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 259 Description: Manufacture of other fabricated metal products; metalworking service activities Explanatory Note Inclusion: This group includes general activities for the treatment of metal, such as forging or pressing, plating, coating, engraving, boring, polishing, welding etc., which are typically carried out on a fee or contract basis. This group also includes the manufacture of a variety of metal products, such as cutlery; metal hand tools and general hardware; cans and buckets; nails, bolts and nuts; metal household articles; metal fixtures; ships propellers and anchors; assembled railway track fixtures etc. for a variety of household and industrial uses. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '70f60468-408c-443d-8737-73b65b804f9a',
		name: '0113:Growing of vegetables and melons, roots and tubers',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0113 Description: Growing of vegetables and melons, roots and tubers Explanatory Note Inclusion: This class includes:\n- growing of leafy or stem vegetables such as:\n* artichokes\n* asparagus\n* cabbages\n* cauliflower and broccoli\n* lettuce and chicory\n* spinach\n* other leafy or stem vegetables\n- growing of fruit bearing vegetables such as:\n* cucumbers and gherkins\n* eggplants (aubergines)\n* tomatoes\n* watermelons\n* cantaloupes\n* other melons and fruit-bearing vegetables\n- growing of root, bulb or tuberous vegetables such as:\n* carrots\n* turnips\n* garlic\n* onions (incl. shallots)\n* leeks and other alliaceous vegetables\n* other root, bulb or tuberous vegetables\n- growing of mushrooms and truffles\n- growing of vegetable seeds, except beet seeds\n- growing of sugar beet\n- growing of other vegetables\n- growing of roots and tubers such as:\n* potatoes\n* sweet potatoes\n* cassava\n* yams\n* other roots and tubers Explanatory Note Exclusion: This class excludes:\n- growing of mushroom spawn, see 0130\n- growing of chilies and peppers (capsicum spp.) and other spices and aromatic crops, see 0128',
	},
	{
		id: '844bb5bd-c3ab-491d-bd6b-baea2f2ba27b',
		name: '2815:Manufacture of ovens, furnaces and furnace burners',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2815 Description: Manufacture of ovens, furnaces and furnace burners Explanatory Note Inclusion: This class includes:\n- manufacture of electrical and other industrial and laboratory furnaces and ovens, including incinerators\n- manufacture of burners\n- manufacture of permanent mount electric space heaters, electric swimming pool heaters\n- manufacture of permanent mount non-electric household heating equipment, such as solar heating, steam heating, oil heat and similar furnaces and heating equipment\n- manufacture of electric household-type furnaces (electric forced air furnaces, heat pumps, etc.), non-electric household forced air furnaces\n\nThis class also includes:\n- manufacture of mechanical stokers, grates, ash dischargers etc. Explanatory Note Exclusion: This class excludes:\n- manufacture of household ovens, see 2750\n- manufacture of agricultural dryers, see 2825\n- manufacture of bakery ovens, see 2825\n- manufacture of dryers for wood, paper pulp, paper or paperboard, see 2829\n- manufacture of medical, surgical or laboratory sterilizers, see 3250\n- manufacture of (dental) laboratory furnaces, see 3250',
	},
	{
		id: '43c925e0-ff00-40b1-a0d0-c7c0ab89d811',
		name: '99:Activities of extraterritorial organizations and bodies',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 99 Description: Activities of extraterritorial organizations and bodies Explanatory Note Inclusion: See class 9900. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2b299ed6-b663-404b-bcc0-8ff7c393f1c5',
		name: '1420:Manufacture of articles of fur',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1420 Description: Manufacture of articles of fur Explanatory Note Inclusion: This class includes:\n- manufacture of articles made of fur skins:\n* fur wearing apparel and clothing accessories\n* assemblies of fur skins such as "dropped" fur skins, plates, mats, strips etc.\n* diverse articles of fur skins: rugs, unstuffed pouffes, industrial polishing cloths Explanatory Note Exclusion: This class excludes:\n- production of raw fur skins, see groups 014 and 017\n- production of raw hides and skins, see 1010\n- manufacture of imitation furs (long-hair cloth obtained by weaving or knitting), see 1312, 1391\n- manufacture of fur hats, see 1410\n- manufacture of apparel trimmed with fur, see 1410\n- dressing and dyeing of fur, see 1511\n- manufacture of boots or shoes containing fur parts, see 1520',
	},
	{
		id: '4254626d-37b7-4373-8575-1fc31c6255a2',
		name: '772:Renting and leasing of personal and household goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 772 Description: Renting and leasing of personal and household goods Explanatory Note Inclusion: This group includes the renting of personal and household goods as well as renting of recreational and sports equipment and video tapes. Activities generally include short-term renting of goods although in some instances, the goods may be leased for longer periods of time. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ea9ad168-c35a-4e29-b3ed-0ba2309a2877',
		name: '4772:Retail sale of pharmaceutical and medical goods, cosmetic and toilet articl',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4772 Description: Retail sale of pharmaceutical and medical goods, cosmetic and toilet articles in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of pharmaceuticals\n- retail sale of medical and orthopaedic goods\n- retail sale of perfumery and cosmetic articles Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '49a7a7bb-a461-419d-92d8-9da7610a62a7',
		name: '4759:Retail sale of electrical household appliances, furniture, lighting equipme',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4759 Description: Retail sale of electrical household appliances, furniture, lighting equipment and other household articles in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of household furniture\n- retail sale of articles for lighting\n- retail sale of household utensils and cutlery, crockery, glassware, china and pottery\n- retail sale of wooden, cork and wickerwork goods\n- retail sale of household appliances\n- retail sale of musical instruments and scores\n- retail sale of security systems, such as locking devices, safes, and vaults, without installation or maintenance services\n- retail sale of household articles and equipment n.e.c. Explanatory Note Exclusion: This class excludes:\n- retail sale of antiques, see 4774',
	},
	{
		id: '6fd72f58-a990-4353-ba92-5b7b9b43626f',
		name: '9200:Gambling and betting activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9200 Description: Gambling and betting activities Explanatory Note Inclusion: This class includes:\n- bookmaking and other betting operations\n- off-track betting\n- operation of casinos, including "floating casinos"\n- sale of lottery tickets\n- operation (exploitation) of coin-operated gambling machines\n- operation of virtual gambling web sites Explanatory Note Exclusion: This class excludes:\n- operation (exploitation) of coin-operated games, see 9329',
	},
	{
		id: 'c0995ac0-c14b-4a8f-9a20-8f3c859d2beb',
		name: '821:Office administrative and support activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 821 Description: Office administrative and support activities Explanatory Note Inclusion: This group includes the provision of a range of day-to-day office administrative services, such as financial planning, billing and record keeping, personnel and physical distribution and logistics for others on a contract or fee basis.\nThis group includes also support activities for others on a contract or fee basis, that are ongoing routine business support functions that businesses and organizations traditionally do for themselves.\nUnits classified in this group do not provide operating staff to carry out the complete operations of a business. Units engaged in one particular aspect of these activities are classified according to that particular activity. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7ccba1dc-6d7c-4795-be1c-29cf13281df6',
		name: '3812:Collection of hazardous waste',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3812 Description: Collection of hazardous waste Explanatory Note Inclusion: This class includes the collection of solid and non-solid hazardous waste, i.e. explosive, oxidizing, flammable, toxic, irritant, carcinogenic, corrosive, infectious and other substances and preparations harmful for human health and environment. It may also entail identification, treatment, packaging and labeling of waste for the purposes of transport.\n\nThis class includes:\n- collection of hazardous waste, such as:\n* used oil from shipment or garages\n* bio-hazardous waste\n* used batteries\n- operation of waste transfer stations for hazardous waste Explanatory Note Exclusion: This class excludes:\n- remediation and clean up of contaminated buildings, mine sites, soil, ground water, e.g. asbestos removal, see 3900',
	},
	{
		id: '6602f0db-7474-431a-beb6-78e0eedc9a47',
		name: '5110:Passenger air transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5110 Description: Passenger air transport Explanatory Note Inclusion: This class includes:\n- transport of passengers by air over regular routes and on regular schedules\n- charter flights for passengers\n- scenic and sightseeing flights\n\nThis class also includes:\n- renting of air-transport equipment with operator for the purpose of passenger transportation\n- general aviation activities, such as:\n* transport of passengers by aero clubs for instruction or pleasure Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '1006eda0-c802-41dc-ab81-5d6622417462',
		name: '3240:Manufacture of games and toys',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3240 Description: Manufacture of games and toys Explanatory Note Inclusion: This class includes the manufacture of dolls, toys and games (including electronic games), scale models and children\'s vehicles (except metal bicycles and tricycles).\n\nThis class includes:\n- manufacture of dolls and doll garments, parts and accessories\n- manufacture of action figures\n- manufacture of toy animals\n- manufacture of toy musical instruments\n- manufacture of playing cards\n- manufacture of board games and similar games\n- manufacture of electronic games: chess etc.\n- manufacture of reduced-size ("scale") models and similar recreational models, electrical trains, construction sets etc.\n- manufacture of coin-operated games, billiards, special tables for casino games, etc.\n- manufacture of articles for funfair, table or parlour games\n- manufacture of wheeled toys designed to be ridden, including plastic bicycles and tricycles\n- manufacture of puzzles and similar articles Explanatory Note Exclusion: This class excludes:\n- manufacture of video game consoles, see 2640\n- manufacture of bicycles, see 3092\n- writing and publishing of software for video game consoles, see 5820, 6201',
	},
	{
		id: '19e93686-0888-4ee7-abf3-70e6535ee823',
		name: '931:Sports activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 931 Description: Sports activities Explanatory Note Inclusion: This group includes the operation of sports facilities; activities of sports teams or clubs primarily participating in live sports events before a paying audience; independent athletes engaged in participating in live sporting or racing events before a paying audience; owners of racing participants such as cars, dogs, horses, etc. primarily engaged in entering them in racing events or other spectator sports events; sports trainers providing specialized services to support participants in sports events or competitions; operators of arenas and stadiums; other activities of organizing, promoting or managing sports events, n.e.c. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '030f8c67-c7be-4ad1-804a-8a95f3d93e59',
		name: '7500:Veterinary activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7500 Description: Veterinary activities Explanatory Note Inclusion: This class includes:\n- animal health care and control activities for farm animals\n- animal health care and control activities for pet animals\nThese activities are carried out by qualified veterinarians when working in veterinary hospitals as well as when visiting farms, kennels or homes, in own consulting and surgery rooms or elsewhere.\n\nThis class also includes:\n- activities of veterinary assistants or other auxiliary veterinary personnel\n- clinico-pathological and other diagnostic activities pertaining to animals\n- animal ambulance activities Explanatory Note Exclusion: This class excludes:\n- farm animal boarding activities without health care, see 0162\n- sheep shearing, see 0162\n- herd testing services, droving services, agistment services, poultry caponizing, see 0162\n- activities related to artificial insemination, see 0162\n- pet animal boarding activities without health care, see 9609',
	},
	{
		id: 'f59d2975-3046-4dde-8cb9-887b4b9908e1',
		name: '0146:Raising of poultry',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0146 Description: Raising of poultry Explanatory Note Inclusion: This class includes:\n- raising and breeding of poultry:\n* fowls of the species Gallus domesticus (chickens and capons), ducks, geese, turkeys and guinea fowls\n- production of eggs\n- operation of poultry hatcheries Explanatory Note Exclusion: This class excludes:\n- production of feathers or down, see 1010',
	},
	{
		id: '653b6f22-d18a-4585-9e60-be2dae051299',
		name: '2022:Manufacture of paints, varnishes and similar coatings, printing ink and mas',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2022 Description: Manufacture of paints, varnishes and similar coatings, printing ink and mastics Explanatory Note Inclusion: This class includes:\n- manufacture of paints and varnishes, enamels or lacquers\n- manufacture of prepared pigments and dyes, opacifiers and colours\n- manufacture of vitrifiable enamels and glazes and engobes and similar preparations\n- manufacture of mastics\n- manufacture of caulking compounds and similar non-refractory filling or surfacing preparations\n- manufacture of organic composite solvents and thinners\n- manufacture of prepared paint or varnish removers\n- manufacture of printing ink Explanatory Note Exclusion: This class excludes:\n- manufacture of dyestuffs and pigments, see 2011\n- manufacture of writing and drawing ink, see 2029',
	},
	{
		id: '8ca134a4-a341-48b8-8ed2-7fd7d6f0f7ad',
		name: '4652:Wholesale of electronic and telecommunications equipment and parts',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4652 Description: Wholesale of electronic and telecommunications equipment and parts Explanatory Note Inclusion: This class includes:\n- wholesale of electronic valves and tubes\n- wholesale of semiconductor devices\n- wholesale of microchips and integrated circuits\n- wholesale of printed circuits\n- wholesale of blank audio and video tapes and diskettes, magnetic and optical disks (CDs, DVDs)\n- wholesale of telephone and communications equipment Explanatory Note Exclusion: This class excludes:\n- wholesale of recorded audio and video tapes, CDs, DVDs, see 4649\n- wholesale of consumer electronics, see 4649\n- wholesale of computers and computer peripheral equipment, see 4651',
	},
	{
		id: 'f829fd8f-f9f2-4cfc-b10e-a97f1c633d61',
		name: '2640:Manufacture of consumer electronics',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2640 Description: Manufacture of consumer electronics Explanatory Note Inclusion: This class includes the manufacture of electronic audio and video equipment for home entertainment, motor vehicle, public address systems and musical instrument amplification. \n\nThis class includes:\n- manufacture of video cassette recorders and duplicating equipment\n- manufacture of televisions\n- manufacture of television monitors and displays\n- manufacture of audio recording and duplicating systems\n- manufacture of stereo equipment\n- manufacture of radio receivers\n- manufacture of speaker systems\n- manufacture of household-type video cameras\n- manufacture of jukeboxes\n- manufacture of amplifiers for musical instruments and public address systems\n- manufacture of microphones\n- manufacture of CD and DVD players\n- manufacture of karaoke machines\n- manufacture of headphones (e.g. radio, stereo, computer)\n- manufacture of video game consoles Explanatory Note Exclusion: This class excludes:\n- reproduction of recorded media (computer media, sound, video, etc.), see 1820\n- manufacture of computer peripheral devices and computer monitors, see 2620\n- manufacture of telephone answering machines, see 2630\n- manufacture of paging equipment, see 2630\n- manufacture of remote control devices (radio and infrared), see 2630\n- manufacture of broadcast studio equipment such as reproduction equipment, transmitting and receiving antennas, commercial video cameras, see 2630 \n- manufacture of electronic games with fixed (non-replaceable) software, see 3240',
	},
	{
		id: '46fcb93a-53b7-4be7-8211-a8dbee17a009',
		name: '2591:Forging, pressing, stamping and roll-forming of metal; powder metallurgy',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2591 Description: Forging, pressing, stamping and roll-forming of metal; powder metallurgy Explanatory Note Inclusion: This class includes:\n- forging, pressing, stamping and roll-forming of metal\n- powder metallurgy: production of metal objects directly from metal powders by heat treatment (sintering) or under pressure Explanatory Note Exclusion: This class excludes:\n- production of metal powder, see 2410, 2420',
	},
	{
		id: '9e768567-730a-47f4-bdb9-83a249f8e682',
		name: '6312:Web portals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6312 Description: Web portals Explanatory Note Inclusion: This class includes:\n- operation of web sites that use a search engine to generate and maintain extensive databases of Internet addresses and content in an easily searchable format\n- operation of other websites that act as portals to the Internet, such as media sites providing periodically updated content Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a2e2c32d-f690-4739-8533-ffb1b5079be1',
		name: '6611:Administration of financial markets',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6611 Description: Administration of financial markets Explanatory Note Inclusion: This class includes:\n- operation and supervision of financial markets other than by public authorities, such as:\n* commodity contracts exchanges\n* futures commodity contracts exchanges\n* securities exchanges\n* stock exchanges\n* stock or commodity options exchanges Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ccf0ca14-80c3-4d34-9301-36ed855e8493',
		name: '089:Mining and quarrying n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 089 Description: Mining and quarrying n.e.c. Explanatory Note Inclusion: [Empty] Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '873e2688-4fb3-4acb-bfaf-1b99b3dca83d',
		name: '2592:Treatment and coating of metals; machining',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2592 Description: Treatment and coating of metals; machining Explanatory Note Inclusion: This class includes:\n- plating, anodizing etc. of metals\n- heat treatment of metals\n- deburring, sandblasting, tumbling, cleaning of metals\n- colouring and engraving of metals\n- non-metallic coating of metals:\n* plasticizing, enamelling, lacquering etc.\n- hardening, buffing of metals\n- boring, turning, milling, eroding, planing, lapping, broaching, levelling, sawing, grinding, sharpening, polishing, welding, splicing etc. of metalwork pieces\n- cutting of and writing on metals by means of laser beams Explanatory Note Exclusion: This class excludes:\n- activities of farriers, see 0162\n- rolling precious metals onto base metals or other metals, see 2420',
	},
	{
		id: 'f8f50159-0ee9-43f8-9465-eeb37bd3b216',
		name: '4781:Retail sale via stalls and markets of food, beverages and tobacco products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4781 Description: Retail sale via stalls and markets of food, beverages and tobacco products Explanatory Note Inclusion: This class includes:\n- retail sale of food, beverages and tobacco products via stalls or markets Explanatory Note Exclusion: This class excludes:\n- retail sale of prepared food for immediate consumption (mobile food vendors), see 5610',
	},
	{
		id: '07c50b01-f1ed-4e92-8d87-5fef4b01a8bc',
		name: '18:Printing and reproduction of recorded media',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 18 Description: Printing and reproduction of recorded media Explanatory Note Inclusion: This division includes printing of products, such as newspapers, books, periodicals, business forms, greeting cards, and other materials, and associated support activities, such as bookbinding, plate-making services, and data imaging. The support activities included here are an integral part of the printing industry, and a product (a printing plate, a bound book, or a computer disk or file) that is an integral part of the printing industry is almost always provided by these operations.\nProcesses used in printing include a variety of methods for transferring an image from a plate, screen, or computer file to a medium, such as paper, plastics, metal, textile articles, or wood. The most prominent of these methods entails the transfer of the image from a plate or screen to the medium through lithographic, gravure, screen or flexographic printing. Often a computer file is used to directly ''drive'' the printing mechanism to create the image or electrostatic and other types of equipment (digital or non-impact printing).\nThough printing and publishing can be carried out by the same unit (a newspaper, for example), it is less and less the case that these distinct activities are carried out in the same physical location.\n\nThis division also includes the reproduction of recorded media, such as compact discs, video recordings, software on discs or tapes, records etc.\n\nThis division excludes publishing activities (see section J). Explanatory Note Exclusion: [Empty]",
	},
	{
		id: '5e49f40b-03e0-44b7-a578-0f5c57409e66',
		name: '272:Manufacture of batteries and accumulators',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 272 Description: Manufacture of batteries and accumulators Explanatory Note Inclusion: See class 2720. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a652f015-bd70-4d6e-9190-78c91c572be2',
		name: '104:Manufacture of vegetable and animal oils and fats',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 104 Description: Manufacture of vegetable and animal oils and fats Explanatory Note Inclusion: See class 1040. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '949a7927-f0a1-47ba-91a8-17a1aa4da553',
		name: '852:Secondary education',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 852 Description: Secondary education Explanatory Note Inclusion: This group includes the provision of general secondary and technical and vocational secondary education. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f69fd4c2-3da9-4a54-a13d-9d565418b3df',
		name: '9102:Museums activities and operation of historical sites and buildings',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9102 Description: Museums activities and operation of historical sites and buildings Explanatory Note Inclusion: This class includes:\n- operation of museums of all kinds:\n* art museums, museums of jewellery, furniture, costumes, ceramics, silverware\n* natural history, science and technological museums, historical museums, including military museums\n* other specialized museums\n* open-air museums\n- operation of historical sites and buildings Explanatory Note Exclusion: This class excludes:\n- renovation and restoration of historical sites and buildings, see section F\n- restoration of works of art and museum collection objects, see 9000\n- activities of libraries and archives, see 9101',
	},
	{
		id: '3a69e393-54be-4c95-a7f2-4660a3257810',
		name: 'K:Financial and insurance activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: K Description: Financial and insurance activities Explanatory Note Inclusion: This section includes financial service activities, including insurance, reinsurance and pension funding activities and activities to support financial services.\nThis section also includes the activities of holding assets, such as activities of holding companies and the activities of trusts, funds and similar financial entities. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8479dfba-6b06-4542-bdeb-039eab582ee9',
		name: '851:Pre-primary and primary education',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 851 Description: Pre-primary and primary education Explanatory Note Inclusion: See class 8510. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b4d16b10-a38d-4191-b703-8dc4e9a3185c',
		name: '551:Short term accommodation activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 551 Description: Short term accommodation activities Explanatory Note Inclusion: See class 5510. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'de9db67f-2579-48d2-8519-0672032989fb',
		name: '952:Repair of personal and household goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 952 Description: Repair of personal and household goods Explanatory Note Inclusion: This group includes the repair and servicing of personal and household goods. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd770a066-d158-4232-b096-466afa957656',
		name: '2431:Casting of iron and steel',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2431 Description: Casting of iron and steel Explanatory Note Inclusion: This class includes the casting of iron and steel, i.e. the activities of iron and steel foundries.\n\nThis class includes:\n- casting of semi-finished iron products\n- casting of grey iron castings\n- casting of spheroidal graphite iron castings\n- casting of malleable cast-iron products\n- casting of semi-finished steel products\n- casting of steel castings\n- manufacture of tubes, pipes and hollow profiles and of tube or pipe fittings of cast-iron\n- manufacture of seamless tubes and pipes of steel by centrifugal casting\n- manufacture of tube or pipe fittings of cast-steel Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0964de5d-3516-480c-a8c2-177d205bd0c8',
		name: '8292:Packaging activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8292 Description: Packaging activities Explanatory Note Inclusion: This class includes:\n- packaging activities on a fee or contract basis, whether or not these involve an automated process:\n* bottling of liquids, including beverages and food\n* packaging of solids (blister packaging, foil-covered etc.)\n* security packaging of pharmaceutical preparations\n* labeling, stamping and imprinting\n* parcel-packing and gift-wrapping Explanatory Note Exclusion: This class excludes:\n- manufacture of soft drinks and production of mineral water, see 1104\n- packaging activities incidental to transport, see 5229',
	},
	{
		id: 'a04d5e46-0285-4b0e-91f7-bc859ada80cb',
		name: '5819:Other publishing activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5819 Description: Other publishing activities Explanatory Note Inclusion: This class includes:\n- publishing (including on-line) of:\n* catalogs\n* photos, engravings and postcards\n* greeting cards\n* forms\n* posters, reproduction of works of art\n* advertising material\n* other printed matter\n- on-line publishing of statistics or other information Explanatory Note Exclusion: This class excludes:\n- retail sale of software, see 4741\n- publishing of advertising newspapers, see 5813\n- on-line provision of software (application hosting and application service provisioning), see 6311',
	},
	{
		id: 'a5071d0a-6e4e-4fb6-a98b-940902b9a3c9',
		name: '2392:Manufacture of clay building materials',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2392 Description: Manufacture of clay building materials Explanatory Note Inclusion: This class includes:\n- manufacture of non-refractory ceramic hearth or wall tiles, mosaic cubes etc.\n- manufacture of non-refractory ceramic flags and paving\n- manufacture of structural non-refractory clay building materials:\n* manufacture of ceramic bricks, roofing tiles, chimney pots, pipes, conduits etc.\n- manufacture of flooring blocks in baked clay\n- manufacture of ceramic sanitary fixtures Explanatory Note Exclusion: This class excludes:\n- manufacture of artificial stone (e.g. cultured marble), see 2220\n- manufacture of refractory ceramic products, see 2391',
	},
	{
		id: '4b751957-9daf-4677-be5b-5d1b19d120ce',
		name: '41:Construction of buildings',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 41 Description: Construction of buildings Explanatory Note Inclusion: This division includes general construction of buildings of all kinds. It includes new work, repair, additions and alterations, the erection of pre-fabricated buildings or structures on the site and also construction of temporary nature. \n\nIncluded is the construction of entire dwellings, office buildings, stores and other public and utility buildings, farm buildings, etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '316a2e84-6b89-42f0-8c99-754f1af09d99',
		name: '98:Undifferentiated goods- and services-producing activities of private househol',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 98 Description: Undifferentiated goods- and services-producing activities of private households for own use Explanatory Note Inclusion: This division includes the undifferentiated subsistence goods-producing and services-producing activities of households. \nHouseholds should be classified here only if it is impossible to identify a primary activity for the subsistence activities of the household. If the household engages in market activities, it should be classified according to the primary market activity carried out. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b6420c5c-e1bb-4f67-a5e8-5ae3d2a94c25',
		name: '309:Manufacture of transport equipment n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 309 Description: Manufacture of transport equipment n.e.c. Explanatory Note Inclusion: This group includes the manufacture of transport equipment other than motor vehicles and rail, water, air or space transport equipment and military vehicles. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '1d0b78e4-c5f9-4f02-81e4-1320be214d40',
		name: '210:Manufacture of pharmaceuticals, medicinal chemical and botanical products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 210 Description: Manufacture of pharmaceuticals, medicinal chemical and botanical products Explanatory Note Inclusion: See class 2100. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8f6eb3c8-6a0d-42f5-a785-5ce9c65d28fe',
		name: '889:Other social work activities without accommodation',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 889 Description: Other social work activities without accommodation Explanatory Note Inclusion: See class 8890. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '87e39185-2bc3-425f-966a-50fc3f868d0c',
		name: '451:Sale of motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 451 Description: Sale of motor vehicles Explanatory Note Inclusion: See class 4510. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '6c31832b-67aa-4b6a-b4ce-23aa4fe64a59',
		name: '0210:Silviculture and other forestry activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0210 Description: Silviculture and other forestry activities Explanatory Note Inclusion: This class includes:\n- growing of standing timber: planting, replanting, transplanting, thinning and conserving of forests and timber tracts\n- growing of coppice, pulpwood and fire wood\n- operation of forest tree nurseries\n\nThese activities can be carried out in natural or planted forests. Explanatory Note Exclusion: This class excludes:\n- growing of Christmas trees, see 0129\n- operation of tree nurseries, see 0130\n- gathering of wild growing non-wood forest products, see 0230\n- production of wood chips and particles, see 1610',
	},
	{
		id: 'f12b2bfd-8cdc-41be-ae94-9ea39312facd',
		name: '9602:Hairdressing and other beauty treatment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9602 Description: Hairdressing and other beauty treatment Explanatory Note Inclusion: This class includes:\n- hair washing, trimming and cutting, setting, dyeing, tinting, waving, straightening and similar activities for men and women\n- shaving and beard trimming\n- facial massage, manicure and pedicure, make-up etc. Explanatory Note Exclusion: This class excludes:\n- manufacture of wigs, see 3290',
	},
	{
		id: 'a98d70ca-f6b9-4287-96fd-35526b4f22ea',
		name: '5914:Motion picture projection activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5914 Description: Motion picture projection activities Explanatory Note Inclusion: This class includes:\n- motion picture or videotape projection in cinemas, in the open air or in other projection facilities\n- activities of cine-clubs Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4e3b16fd-4339-4da2-89fa-1776b6d26ee3',
		name: '55:Accommodation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 55 Description: Accommodation Explanatory Note Inclusion: This division includes the provision of short-stay accommodation for visitors and other travellers. Also included is the provision of longer-term accommodation for students, workers and similar individuals. Some units may provide only accommodation while others provide a combination of accommodation, meals and/or recreational facilities. \n\nThis division excludes activities related to the provision of long-term primary residences in facilities such as apartments typically leased on a monthly or annual basis classified in Real Estate (section L). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '27f6acbc-2350-450e-9762-1ce00e12ecba',
		name: '2395:Manufacture of articles of concrete, cement and plaster',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2395 Description: Manufacture of articles of concrete, cement and plaster Explanatory Note Inclusion: This class includes:\n- manufacture of precast concrete, cement or artificial stone articles for use in construction:\n* tiles, flagstones, bricks, boards, sheets, panels, pipes, posts etc.\n- manufacture of prefabricated structural components for buildings or civil engineering of cement, concrete or artificial stone\n- manufacture of plaster articles for use in construction:\n* boards, sheets, panels etc.\n- manufacture of building materials of vegetable substances (wood wool, straw, reeds, rushes) agglomerated with cement, plaster or other mineral binder\n- manufacture of articles of asbestos-cement or cellulose fibre-cement or the like:\n* corrugated sheets, other sheets, panels, tiles, tubes, pipes, reservoirs, troughs, basins, sinks, jars, furniture, window frames etc.\n- manufacture of other articles of concrete, plaster, cement or artificial stone:\n* statuary, furniture, bas- and haut-reliefs, vases, flowerpots etc. \n- manufacture of powdered mortars\n- manufacture of ready-mix and dry-mix concrete and mortars Explanatory Note Exclusion: This class excludes:\n- manufacture of refractory cements and mortars, see 2391',
	},
	{
		id: '43429646-9fe5-4e27-97f2-d43420d54942',
		name: '264:Manufacture of consumer electronics',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 264 Description: Manufacture of consumer electronics Explanatory Note Inclusion: See class 2640. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a352ef60-ced7-411f-a130-1c6d9a9e7ec3',
		name: '321:Manufacture of jewellery, bijouterie and related articles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 321 Description: Manufacture of jewellery, bijouterie and related articles Explanatory Note Inclusion: This group includes the manufacture of jewellery and imitation jewellery articles. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9bdfe275-d909-469a-b7ab-59c0276324f7',
		name: '75:Veterinary activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 75 Description: Veterinary activities Explanatory Note Inclusion: This division includes the provision of animal health care and control activities for farm animals or pet animals. These activities are carried out by qualified veterinarians in veterinary hospitals as well as when visiting farms, kennels or homes, in own consulting and surgery rooms or elsewhere. It also includes animal ambulance activities. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8d18ce40-6748-4408-9c36-5f7857ee4341',
		name: '452:Maintenance and repair of motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 452 Description: Maintenance and repair of motor vehicles Explanatory Note Inclusion: See class 4520. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '75bc0b69-da0f-4d03-8801-b670b2771a3d',
		name: '771:Renting and leasing of motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 771 Description: Renting and leasing of motor vehicles Explanatory Note Inclusion: See class 7710. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '216ef364-ec9f-4618-8166-e702f12c2209',
		name: '5621:Event catering',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5621 Description: Event catering Explanatory Note Inclusion: This class includes the provision of food services based on contractual arrangements with the customer, at the location specified by the customer, for a specific event.\n\nThis class includes:\n- event catering Explanatory Note Exclusion: This class excludes:\n- manufacture of perishable food items for resale, see 1079\n- retail sale of perishable food items, see division 47',
	},
	{
		id: 'd7f4796c-f3ee-4698-85b2-d7352551c2f5',
		name: '981:Undifferentiated goods-producing activities of private households for own us',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 981 Description: Undifferentiated goods-producing activities of private households for own use Explanatory Note Inclusion: See class 9810. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '91651648-1388-4219-84ad-99d290d22475',
		name: '4789:Retail sale via stalls and markets of other goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4789 Description: Retail sale via stalls and markets of other goods Explanatory Note Inclusion: This class includes:\n- retail sale of other goods via stalls or markets, such as:\n* carpets and rugs\n* books\n* games and toys\n* household appliances and consumer electronics\n* music and video recordings Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'acb1b715-5ae6-40ca-9c4a-88536ecf7879',
		name: '2652:Manufacture of watches and clocks',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2652 Description: Manufacture of watches and clocks Explanatory Note Inclusion: This class includes the manufacture of watches, clocks and timing mechanisms and parts thereof.\n\nThis class includes:\n- manufacture of watches and clocks of all kinds, including instrument panel clocks\n- manufacture of watch and clock cases, including cases of precious metals\n- manufacture of time-recording equipment and equipment for measuring, recording and otherwise displaying intervals of time with a watch or clock movement or with synchronous motor, such as:\n* parking meters\n* time clocks\n* time/date stamps\n* process timers\n- manufacture of time switches and other releases with a watch or clock movement or with synchronous motor:\n* time locks\n- manufacture of components for clocks and watches: \n* movements of all kinds for watches and clocks\n* springs, jewels, dials, hands, plates, bridges and other parts Explanatory Note Exclusion: This class excludes:\n- manufacture of non-metal watch bands (textile, leather, plastic), see 1512\n- manufacture of watch bands of precious metal, see 3211\n- manufacture of watch bands of non-precious metal, see 3212',
	},
	{
		id: 'f55a95a9-8f5d-415c-846f-9b8eb99e7993',
		name: '91:Libraries, archives, museums and other cultural activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 91 Description: Libraries, archives, museums and other cultural activities Explanatory Note Inclusion: This division includes activities of libraries and archives; the operation of museums of all kinds, botanical and zoological gardens; the operation of historical sites and nature reserves activities. It also includes the preservation and exhibition of objects, sites and natural wonders of historical, cultural or educational interest (e.g. world heritage sites, etc).\n\nThis division excludes sports, amusement and recreation activities, such as the operation of bathing beaches and recreation parks (see division 93). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ac6da42a-64fd-41be-823f-4aeffb0f29b7',
		name: '023:Gathering of non-wood forest products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 023 Description: Gathering of non-wood forest products Explanatory Note Inclusion: See class 0230. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '342394b8-9070-4bb2-b009-8599cd2d9847',
		name: '106:Manufacture of grain mill products, starches and starch products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 106 Description: Manufacture of grain mill products, starches and starch products Explanatory Note Inclusion: This group includes the milling of flour or meal from grains or vegetables, the milling, cleaning and polishing of rice, as well as the manufacture of flour mixes or doughs from these products. Also included in this group are the wet milling of corn and vegetables and the manufacture of starch and starch products. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'aed80f6a-eb11-4ccb-9c54-8ddde68b11e7',
		name: '3312:Repair of machinery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3312 Description: Repair of machinery Explanatory Note Inclusion: This class includes the repair and maintenance of industrial machinery and equipment like sharpening or installing commercial and industrial machinery blades and saws; the provision of welding (e.g. automotive, general) repair services; the repair of agricultural and other heavy and industrial machinery and equipment (e.g. forklifts and other materials handling equipment, machine tools, commercial refrigeration equipment, construction equipment and mining machinery), comprising machinery and equipment of division 28.\n\nThis class includes:\n- repair and maintenance of non-automotive engines, e.g. ship or rail engines\n- repair and maintenance of pumps and related equipment\n- repair and maintenance of fluid power equipment\n- repair of valves\n- repair of gearing and driving elements\n- repair and maintenance of industrial process furnaces\n- repair and maintenance of materials handling equipment\n- repair and maintenance of commercial refrigeration equipment and air purifying equipment\n- repair and maintenance of commercial-type general-purpose machinery\n- repair of other power-driven hand-tools\n- repair and maintenance of metal cutting and metal forming machine tools and accessories\n- repair and maintenance of other machine tools\n- repair and maintenance of agricultural tractors\n- repair and maintenance of agricultural machinery and forestry and logging machinery\n- repair and maintenance of metallurgy machinery\n- repair and maintenance of mining, construction, and oil and gas field machinery\n- repair and maintenance of food, beverage, and tobacco processing machinery\n- repair and maintenance of textile apparel, and leather production machinery\n- repair and maintenance of papermaking machinery\n- repair and maintenance of other special-purpose machinery of division 28\n- repair and maintenance of weighing equipment \n- repair and maintenance of vending machines\n- repair and maintenance of cash registers\n- repair and maintenance of photocopy machines\n- repair of calculators, electronic or not\n- repair of typewriters Explanatory Note Exclusion: This class excludes: \n- installation, repair and maintenance of furnaces and other heating equipment, see 4322\n- installation, repair and maintenance of elevators and escalators, see 4329',
	},
	{
		id: 'a5b70df8-9a28-4642-bc23-927a1919bc8c',
		name: '1392:Manufacture of made-up textile articles, except apparel',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1392 Description: Manufacture of made-up textile articles, except apparel Explanatory Note Inclusion: This class includes:\n- manufacture, of made-up articles of any textile material, including of knitted or crocheted fabrics:\n* blankets, including travelling rugs\n* bed, table, toilet or kitchen linen\n* quilts, eiderdowns, cushions, pouffes, pillows, sleeping bags etc.\n- manufacture of made-up furnishing articles:\n* curtains, valances, blinds, bedspreads, furniture or machine covers etc.\n* tarpaulins, tents, camping goods, sails, sunblinds, loose covers for cars, machines or furniture etc.\n* flags, banners, pennants etc.\n* dust cloths, dishcloths and similar articles, life jackets, parachutes etc.\n\nThis class also includes:\n- manufacture of the textile part of electric blankets\n- manufacture of hand-woven tapestries\n- manufacture of tire covers Explanatory Note Exclusion: This class excludes:\n- manufacture of textile articles for technical use, see 1399',
	},
	{
		id: '608d1de1-31c7-4766-b1cf-63f4666b6ffe',
		name: '6619:Other activities auxiliary to financial service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6619 Description: Other activities auxiliary to financial service activities Explanatory Note Inclusion: This class includes activities auxiliary to financial service activities not elsewhere classified, such as:\n- financial transaction processing and settlement activities, including for credit card transactions\n- investment advisory services \n- activities of mortgage advisers and brokers\n\nThis class also includes:\n- trustee, fiduciary and custody services on a fee or contract basis Explanatory Note Exclusion: This class excludes:\n- activities of insurance agents and brokers, see 6622\n- management of funds, see 6630',
	},
	{
		id: '9a63625a-358b-4c1d-bf95-50ba038a759b',
		name: '3821:Treatment and disposal of non-hazardous waste',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3821 Description: Treatment and disposal of non-hazardous waste Explanatory Note Inclusion: This class includes the disposal, treatment prior to disposal and other treatment of solid or non-solid non-hazardous waste.\n\nThis class includes:\n- operation of landfills for the disposal of non-hazardous waste\n- disposal of non-hazardous waste by combustion or incineration or other methods, with or without the resulting production of electricity or steam, substitute fuels, biogas, ashes or other by-products for further use etc.\n- treatment of organic waste for disposal\n- production of compost from organic waste Explanatory Note Exclusion: This class excludes:\n- incineration and combustion of hazardous waste, see 3822\n- operation of facilities where commingled recoverable materials such as paper, plastics, used beverage cans and metals, are sorted into distinct categories, see 3830\n- decontamination, clean up of land, water; toxic material abatement, see 3900',
	},
	{
		id: 'dd05c8f2-be18-4d9f-bbb3-ecdfe041a1f8',
		name: '27:Manufacture of electrical equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 27 Description: Manufacture of electrical equipment Explanatory Note Inclusion: This division includes the manufacture of products that generate, distribute and use electrical power. Also included is the manufacture of electrical lighting, signalling equipment and electric household appliances.\n\nThis division excludes the manufacture of electronic products (see division 26). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'bcf939b6-c609-4a97-8df7-1da241dc7827',
		name: '439:Other specialized construction activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 439 Description: Other specialized construction activities Explanatory Note Inclusion: See class 4390. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '252082de-7cec-4d38-a58f-2819f633c6b6',
		name: '4220:Construction of utility projects',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4220 Description: Construction of utility projects Explanatory Note Inclusion: This class includes the construction of distribution lines and related buildings and structures that are integral part of these systems.\n\nThis class includes:\n- construction of civil engineering constructions for:\n* long-distance pipelines, communication and power lines\n* urban pipelines, urban communication and power lines; ancillary urban works\n* water main and line construction\n* irrigation systems (canals)\n* reservoirs\n- construction of:\n* sewer systems, including repair\n* sewage disposal plants\n* pumping stations\n* power plants\n\nThis class also includes:\n- water well drilling Explanatory Note Exclusion: This class excludes:\n- project management activities related to civil engineering works, see 7110',
	},
	{
		id: '2cfcdc94-c2a1-48e0-b17c-7413766236e7',
		name: '252:Manufacture of weapons and ammunition',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 252 Description: Manufacture of weapons and ammunition Explanatory Note Inclusion: See class 2520. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5be28f99-feb5-4a07-86fd-0be930a8d139',
		name: '45:Wholesale and retail trade and repair of motor vehicles and motorcycles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 45 Description: Wholesale and retail trade and repair of motor vehicles and motorcycles Explanatory Note Inclusion: This division includes all activities (except manufacture and renting) related to motor vehicles and motorcycles, including lorries and trucks, such as the wholesale and retail sale of new and second-hand vehicles, the repair and maintenance of vehicles and the wholesale and retail sale of parts and accessories for motor vehicles and motorcycles. Also included are activities of commission agents involved in wholesale or retail sale of vehicles.\nThis division also includes activities such as washing, polishing of vehicles etc.\n\nThis division does not include the retail sale of automotive fuel and lubricating or cooling products or the renting of motor vehicles or motorcycles. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8464f70f-3faa-4d61-a444-08cc2543ba2e',
		name: '773:Renting and leasing of other machinery, equipment and tangible goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 773 Description: Renting and leasing of other machinery, equipment and tangible goods Explanatory Note Inclusion: See class 7730. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '75dc565a-69d2-433c-bfd5-5b57a53a5c38',
		name: '823:Organization of conventions and trade shows',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 823 Description: Organization of conventions and trade shows Explanatory Note Inclusion: See class 8230. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '562d396f-b27d-437b-b69f-3bfe87fcd737',
		name: '0123:Growing of citrus fruits',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0123 Description: Growing of citrus fruits Explanatory Note Inclusion: This class includes:\n- growing of citrus fruits:\n* grapefruit and pomelo\n* lemons and limes\n* oranges\n* tangerines, mandarins and clementines\n* other citrus fruits Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9ace646e-c525-485f-9a38-83141d126718',
		name: '1072:Manufacture of sugar',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1072 Description: Manufacture of sugar Explanatory Note Inclusion: This class includes:\n- manufacture or refining of sugar (sucrose) and sugar substitutes from the juice of cane, beet, maple and palm\n- manufacture of sugar syrups\n- manufacture of molasses\n- production of maple syrup and sugar Explanatory Note Exclusion: This class excludes:\n- manufacture of glucose, glucose syrup, maltose, see 1062',
	},
	{
		id: '52d7089b-97f1-451f-848b-4a64911c84d4',
		name: '0119:Growing of other non-perennial crops',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0119 Description: Growing of other non-perennial crops Explanatory Note Inclusion: This class includes the growing of non-perennial crops not elsewhere classified.\n\nThis class includes:\n- growing of swedes, mangolds, fodder roots, clover, alfalfa, sainfoin, maize and other grasses, forage kale and similar forage products \n- growing of beet seeds (excluding sugar beet seeds) and seeds of forage plants\n- growing of flowers, including production of cut flowers and flower buds\n- growing of flower seeds Explanatory Note Exclusion: This class excludes:\n- growing of sunflower seeds, see 0111\n- growing of non-perennial spice, aromatic, drug and pharmaceutical crops, see 0128',
	},
	{
		id: '96c51c9d-9ba9-4439-b99f-c18aa0f0f457',
		name: '453:Sale of motor vehicle parts and accessories',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 453 Description: Sale of motor vehicle parts and accessories Explanatory Note Inclusion: See class 4530. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'bae21e5b-f0be-4d65-beba-6e6015cda646',
		name: '381:Waste collection',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 381 Description: Waste collection Explanatory Note Inclusion: This group includes the collection of waste from households and businesses by means of refuse bins, wheeled bins, containers, etc. It includes collection of non-hazardous and hazardous waste e.g. waste from households, used batteries, used cooking oils and fats, waste oil from ships and used oil from garages, as well as construction and demolition waste. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd2fb1bbf-a7b1-45f1-9d25-db7e28a70db2',
		name: '8510:Pre-primary and primary education',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8510 Description: Pre-primary and primary education Explanatory Note Inclusion: This class includes the provision of instruction designed primarily to introduce very young children to a school-type environment and instruction that gives students a sound basic education in reading, writing and mathematics along with an elementary understanding of other subjects such as history, geography, natural science, social science, art and music. Such education is generally provided for children, however the provision of literacy programmes within or outside the school system, which are similar in content to programmes in primary education but are intended for those considered too old to enter elementary schools, is also included. Also included is the provision of programmes at a similar level, suited to children with special needs education. Education can be provided in classrooms or through radio, television broadcast, Internet, correspondence or at home.\n\nThis class includes:\n- pre-primary education\n- primary education\n\nThis class also includes:\n- special education for handicapped students at this level\n- provision of literacy programmes for adults Explanatory Note Exclusion: This class excludes:\n- adult education as defined in group 854\n- child day-care activities, see 8890',
	},
	{
		id: '1699ec5e-599d-4b65-9c4f-a08fac752ed9',
		name: '2520:Manufacture of weapons and ammunition',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2520 Description: Manufacture of weapons and ammunition Explanatory Note Inclusion: This class includes:\n- manufacture of heavy weapons (artillery, mobile guns, rocket launchers, torpedo tubes, heavy machine guns)\n- manufacture of small arms (revolvers, shotguns, light machine guns)\n- manufacture of air or gas guns and pistols\n- manufacture of war ammunition\n\nThis class also includes:\n- manufacture of hunting, sporting or protective firearms and ammunition\n- manufacture of explosive devices such as bombs, mines and torpedoes Explanatory Note Exclusion: This class excludes:\n- manufacture of percussion caps, detonators or signalling flares, see 2029\n- manufacture of cutlasses, swords, bayonets etc., see 2593\n- manufacture of armoured vehicles for the transport of banknotes or valuables, see 2910\n- manufacture of space vehicles, see 3030\n- manufacture of tanks and other fighting vehicles, see 3040',
	},
	{
		id: 'be39820a-80ae-4419-9621-ec9499c13d21',
		name: '4922:Other passenger land transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4922 Description: Other passenger land transport Explanatory Note Inclusion: This class includes:\n- other passenger road transport:\n* scheduled long-distance bus services\n* charters, excursions and other occasional coach services\n* taxi operation\n* airport shuttles\n- operation of telfers (t\u00e9l\u00e9ph\u00e9riques), funiculars, ski and cable lifts if not part of urban or suburban transit systems\n\nThis class also includes:\n- other renting of private cars with driver\n- operation of school buses and buses for transport of employees\n- passenger transport by man- or animal-drawn vehicles Explanatory Note Exclusion: This class excludes:\n- ambulance transport, see 8690',
	},
	{
		id: 'f73c379b-ddbe-4eee-aae6-c28207a405a2',
		name: '7810:Activities of employment placement agencies',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7810 Description: Activities of employment placement agencies Explanatory Note Inclusion: This class includes listing employment vacancies and referring or placing applicants for employment, where the individuals referred or placed are not employees of the employment agencies.\n\nThis class includes:\n- personnel search, selection referral and placement activities, including executive placement and search activities\n- activities of casting agencies and bureaus, such as theatrical casting agencies\n- activities of on-line employment placement agencies Explanatory Note Exclusion: This class excludes:\n- activities of personal theatrical or artistic agents or agencies, see 7490',
	},
	{
		id: '1fea6ed6-97ab-4e6a-9637-cb2e34221d55',
		name: '351:Electric power generation, transmission and distribution',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 351 Description: Electric power generation, transmission and distribution Explanatory Note Inclusion: See class 3510. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5dc717de-26f0-411b-9f43-2607ad8a0863',
		name: '072:Mining of non-ferrous metal ores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 072 Description: Mining of non-ferrous metal ores Explanatory Note Inclusion: This group includes the mining of non-ferrous metal ores. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '531ed94a-0916-4088-a658-da554fd28c1c',
		name: '032:Aquaculture',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 032 Description: Aquaculture Explanatory Note Inclusion: This group includes aquaculture (or aquafarming), i.e. the production process involving the culturing or farming (including harvesting) of aquatic organisms (fish, molluscs, crustaceans, plants, crocodiles, alligators and amphibians) using techniques designed to increase the production of the organisms in question beyond the natural capacity of the environment (for example regular stocking, feeding and protection from predators). \nCulturing/farming refers to the rearing up to their juvenile and/or adult phase under captive conditions of the above organisms. In addition, aquaculture also encompasses individual, corporate or state ownership of the individual organisms throughout the rearing or culture stage, up to and including harvesting. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '29d4ae9e-ad18-43fe-b6d0-d1782b26ae4a',
		name: '942:Activities of trade unions',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 942 Description: Activities of trade unions Explanatory Note Inclusion: See class 9420. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '79f1f27e-deb8-487d-8ce7-f0e6fb36e778',
		name: '53:Postal and courier activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 53 Description: Postal and courier activities Explanatory Note Inclusion: This division includes postal and courier activities, such as pickup, transport and delivery of letters and parcels under various arrangements. Local delivery and messenger services are also included. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b7f9d729-4993-43fd-9093-b2c8732b0d92',
		name: '5520:Camping grounds, recreational vehicle parks and trailer parks',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5520 Description: Camping grounds, recreational vehicle parks and trailer parks Explanatory Note Inclusion: This class includes:\n- provision of accommodation in campgrounds, trailer parks, recreational camps and fishing and hunting camps for short stay visitors\n- provision of space and facilities for recreational vehicles\n\nThis class also includes accommodation provided by:\n- protective shelters or plain bivouac facilities for placing tents and/or sleeping bags Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'eaa072c2-2b82-4df0-8f42-aeb7d7ccdde3',
		name: '9810:Undifferentiated goods-producing activities of private households for own u',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9810 Description: Undifferentiated goods-producing activities of private households for own use Explanatory Note Inclusion: This class includes:\n- undifferentiated subsistence goods-producing activities of households, i.e., the activities of households that are engaged in a variety of activities that produce goods for their own subsistence. These activities include hunting and gathering, farming, the production of shelter and clothing and other goods produced by the household for its own subsistence.\n\nIf households are also engaged in the production of marketed goods, they are classified to the appropriate goods-producing industry of ISIC.\nIf households are principally engaged in a specific goods-producing subsistence activity, they are classified to the appropriate goods-producing industry of ISIC. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '66a7a188-be8b-49f7-b109-d7a00dce7529',
		name: '4690:Non-specialized wholesale trade',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4690 Description: Non-specialized wholesale trade Explanatory Note Inclusion: This class includes:\n- wholesale of a variety of goods without any particular specialization Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '494b2856-8df5-4584-a58c-5f2672aa4572',
		name: '6420:Activities of holding companies',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6420 Description: Activities of holding companies Explanatory Note Inclusion: This class includes the activities of holding companies, i.e. units that hold the assets (owning controlling-levels of equity) of a group of subsidiary corporations and whose principal activity is owning the group. The holding companies in this class do not provide any other service to the businesses in which the equity is held, i.e. they do not administer or manage other units. Explanatory Note Exclusion: This class excludes:\n- active management of companies and enterprises, strategic planning and decision making of the company, see 7010',
	},
	{
		id: 'f0b72d3d-d1be-4a3d-bb16-27b528cfd614',
		name: '011:Growing of non-perennial crops',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 011 Description: Growing of non-perennial crops Explanatory Note Inclusion: This group includes the growing of non-perennial crops, i.e. plants that do not last for more than two growing seasons. Included is the growing of these plants for the purpose of seed production. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'dcd72ac3-6b19-45f4-badb-37f523b397c5',
		name: '7730:Renting and leasing of other machinery, equipment and tangible goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7730 Description: Renting and leasing of other machinery, equipment and tangible goods Explanatory Note Inclusion: This class includes:\n- renting and operational leasing, without operator, of other machinery and equipment that are generally used as capital goods by industries:\n* engines and turbines\n* machine tools\n* mining and oilfield equipment\n* professional radio, television and communication equipment\n* motion picture production equipment\n* measuring and controlling equipment\n* other scientific, commercial and industrial machinery\n- renting and operational leasing of land-transport equipment (other than motor vehicles) without drivers:\n* motorcycles, caravans and campers etc.\n* railroad vehicles\n- renting and operational leasing of water-transport equipment without operator: \n* commercial boats and ships\n- renting and operational leasing of air transport equipment without operator:\n* airplanes\n* hot-air balloons \n- renting and operational leasing of agricultural and forestry machinery and equipment without operator:\n* renting of products produced by class 2821, such as agricultural tractors etc.\n- renting and operational leasing of construction and civil-engineering machinery and equipment without operator:\n* crane lorries\n* scaffolds and work platforms, without erection and dismantling\n- renting and operational leasing of office machinery and equipment without operator:\n* computers and computer peripheral equipment\n* duplicating machines, typewriters and word-processing machines\n* accounting machinery and equipment: cash registers, electronic calculators etc.\n* office furniture\n\nThis class also includes:\n- renting of accommodation or office containers\n- renting of containers\n- renting of pallets\n- renting of animals (e.g. herds, race horses) Explanatory Note Exclusion: This class excludes:\n- renting of agricultural and forestry machinery or equipment with operator, see 0161, 0240\n- renting of construction and civil engineering machinery or equipment with operator, see division 43\n- renting of water-transport equipment with operator, see division 50\n- renting of air-transport equipment with operator, see division 51\n- financial leasing, see 6491\n- renting of pleasure boats, see 7721\n- renting of bicycles, see 7721',
	},
	{
		id: 'e574fecf-56cc-4e8d-bd81-0d7ab3ed17cf',
		name: '862:Medical and dental practice activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 862 Description: Medical and dental practice activities Explanatory Note Inclusion: See class 8620. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9da1f192-bea0-4d4d-ad5c-9f07964291cc',
		name: '750:Veterinary activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 750 Description: Veterinary activities Explanatory Note Inclusion: See class 7500. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '43ded126-09f3-4f19-8d20-1df99b74ee54',
		name: '2812:Manufacture of fluid power equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2812 Description: Manufacture of fluid power equipment Explanatory Note Inclusion: This class includes:\n- manufacture of hydraulic and pneumatic components (including hydraulic pumps, hydraulic motors, hydraulic and pneumatic cylinders, hydraulic and pneumatic valves, hydraulic and pneumatic hose and fittings)\n- manufacture of air preparation equipment for use in pneumatic systems\n- manufacture of fluid power systems\n- manufacture of hydraulic transmission equipment Explanatory Note Exclusion: This class excludes:\n- manufacture of compressors, see 2813\n- manufacture of pumps and valves for non-fluid power applications, see 2813\n- manufacture of mechanical transmission equipment, see 2814',
	},
	{
		id: 'a2cfa5cb-7e0a-4b16-88d6-75bececda629',
		name: '0112:Growing of rice',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0112 Description: Growing of rice Explanatory Note Inclusion: This class includes:\n- growing of rice (including organic farming and the growing of genetically modified rice) Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '112b5bbb-898b-4e1f-8870-e1af0eaa4fef',
		name: '29:Manufacture of motor vehicles, trailers and semi-trailers',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 29 Description: Manufacture of motor vehicles, trailers and semi-trailers Explanatory Note Inclusion: This division includes the manufacture of motor vehicles for transporting passengers or freight. The manufacture of various parts and accessories, as well as the manufacture of trailers and semi-trailers, is included here.\nThe maintenance and repair of vehicles produced in this division are classified in 4520. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ef763d53-dd2a-4d1a-b6ee-57a46d244f0d',
		name: '279:Manufacture of other electrical equipment',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 279 Description: Manufacture of other electrical equipment Explanatory Note Inclusion: See class 2790. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '1330953c-78b1-4350-8c9b-f56282078fb9',
		name: '0990:Support activities for other mining and quarrying',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0990 Description: Support activities for other mining and quarrying Explanatory Note Inclusion: This class includes:\n- support services on a fee or contract basis, required for mining activities of divisions 05, 07 and 08\n* exploration services, e.g. traditional prospecting methods, such as taking core samples and making geological observations at prospective sites\n* draining and pumping services, on a fee or contract basis\n* test drilling and test hole boring Explanatory Note Exclusion: This class excludes:\n- operating mines or quarries on a contract or fee basis, see division 05, 07 or 08\n- specialized repair of mining machinery, see 3312\n- geophysical surveying services, on a contract or fee basis, see 7110',
	},
	{
		id: '15b7071f-02eb-4aa5-bd91-0f8ab44a6876',
		name: '8690:Other human health activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 8690 Description: Other human health activities Explanatory Note Inclusion: This class includes:\n- activities for human health not performed by hospitals or by medical doctors or dentists:\n* activities of nurses, midwives, physiotherapists or other paramedical practitioners in the field of optometry, hydrotherapy, medical massage, occupational therapy, speech therapy, chiropody, homeopathy, chiropractice, acupuncture etc.\nThese activities may be carried out in health clinics such as those attached to firms, schools, homes for the aged, labour organizations and fraternal organizations and in residential health facilities other than hospitals, as well as in own consulting rooms, patients' homes or elsewhere. These activities do not involve medical treatment.\n\nThis class also includes:\n- activities of dental paramedical personnel such as dental therapists, school dental nurses and dental hygienists, who may work remote from, but are periodically supervised by, the dentist\n- activities of medical laboratories such as:\n* X-ray laboratories and other diagnostic imaging centres\n* blood analysis laboratories\n- activities of blood banks, sperm banks, transplant organ banks etc.\n- ambulance transport of patients by any mode of transport including airplanes. These services are often provided during a medical emergency. Explanatory Note Exclusion: This class excludes:\n- production of artificial teeth, denture and prosthetic appliances by dental laboratories, see 3250\n- transfer of patients, with neither equipment for lifesaving nor medical personnel, see divisions 49, 50, 51\n- non-medical laboratory testing, see 7120\n- testing activities in the field of food hygiene, see 7120\n- hospital activities, see 8610\n- medical and dental practice activities, see 8620\n- nursing care facilities, see 8710",
	},
	{
		id: '12ac7476-af84-46f8-8801-22fee7841299',
		name: '9521:Repair of consumer electronics',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9521 Description: Repair of consumer electronics Explanatory Note Inclusion: This class includes:\n- repair and maintenance of consumer electronics:\n* television, radio receivers\n* video cassette recorders (VCR)\n* CD players\n* household-type video cameras Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '97cb61b4-f165-4227-831a-0df604658946',
		name: '20:Manufacture of chemicals and chemical products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 20 Description: Manufacture of chemicals and chemical products Explanatory Note Inclusion: This division includes the transformation of organic and inorganic raw materials by a chemical process and the formation of products. It distinguishes the production of basic chemicals that constitute the first industry group from the production of intermediate and end products produced by further processing of basic chemicals that make up the remaining industry classes. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'df3b4969-2c2e-4097-b726-0f75dff8ba87',
		name: '9601:Washing and (dry-) cleaning of textile and fur products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 9601 Description: Washing and (dry-) cleaning of textile and fur products Explanatory Note Inclusion: This class includes:\n- laundering and dry-cleaning, pressing etc., of all kinds of clothing (including fur) and textiles, provided by mechanical equipment, by hand or by self-service coin-operated machines, whether for the general public or for industrial or commercial clients\n- laundry collection and delivery\n- carpet and rug shampooing and drapery and curtain cleaning, whether on clients' premises or not\n- provision of linens, work uniforms and related items by laundries\n- diaper supply services\n\nThis class also includes:\n- repair and minor alteration of garments or other textile articles when done in connection with cleaning Explanatory Note Exclusion: This class excludes:\n- renting of clothing other than work uniforms, even if cleaning of these goods is an integral part of the activity, see 7730\n- repair and alteration of clothing etc., as an independent activity, see 9529",
	},
	{
		id: '9965c3e0-dd25-44e7-a11e-36fd01e1891a',
		name: '5911:Motion picture, video and television programme production activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5911 Description: Motion picture, video and television programme production activities Explanatory Note Inclusion: This class includes:\n- production of motion pictures, videos, television programmes or television commercials Explanatory Note Exclusion: This class excludes:\n- film duplicating (except reproduction of motion picture film for theatrical distribution) as well as reproduction of audio and video tapes, CDs or DVDs from master copies, see 1820\n- wholesale of recorded video tapes, CDs, DVDs, see 4649\n- retail trade of video tapes, CDs, DVDs, see 4762\n- post-production activities, see 5912\n- reproduction of motion picture film for theatrical distribution, see 5912\n- sound recording and recording of books on tape, see 5920\n- creating a complete television channel programme, see 6020\n- television broadcasting, see 6020\n- film processing other than for the motion picture industry, see 7420\n- activities of personal theatrical or artistic agents or agencies, see 7490\n- renting of video tapes, DVDs to the general public, see 7722\n- real-time (i.e. simultaneous) closed captioning of live television performances, meetings, conferences, etc., see 8299\n- activities of own account actors, cartoonists, directors, stage designers and technical specialists, see 9000',
	},
	{
		id: 'c9af237a-71a5-44d6-a728-2b822b42a6a6',
		name: '9524:Repair of furniture and home furnishings',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9524 Description: Repair of furniture and home furnishings Explanatory Note Inclusion: This class includes:\n- reupholstering, refinishing, repairing and restoring of furniture and home furnishings including office furniture\n- assembly of self-standing furniture Explanatory Note Exclusion: This class excludes:\n- installation of fitted kitchens, shop fittings and the like, see 4330',
	},
	{
		id: '87900b2a-84ac-4455-8eea-235d0444b253',
		name: '9411:Activities of business and employers membership organizations',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 9411 Description: Activities of business and employers membership organizations Explanatory Note Inclusion: This class includes:\n- activities of organizations whose members' interests centre on the development and prosperity of enterprises in a particular line of business or trade, including farming, or on the economic growth and climate of a particular geographical area or political subdivision without regard for the line of business.\n- activities of federations of such associations\n- activities of chambers of commerce, guilds and similar organizations\n- dissemination of information, representation before government agencies, public relations and labour negotiations of business and employer organizations Explanatory Note Exclusion: This class excludes:\n- activities of trade unions, see 9420",
	},
	{
		id: 'd1c0a2c9-5b2d-48b0-935a-6e720ed2d70e',
		name: "1622:Manufacture of builders' carpentry and joinery",
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 1622 Description: Manufacture of builders' carpentry and joinery Explanatory Note Inclusion: This class includes:\n- manufacture of wooden goods intended to be used primarily in the construction industry:\n* beams, rafters, roof struts\n* glue-laminated or metal connected prefabricated wooden roof trusses\n* doors, windows, shutters and their frames, whether or not containing metal fittings, such as hinges, locks etc.\n* stairs, railings\n* wooden beadings and mouldings, shingles and shakes\n* parquet floor blocks, strips etc., assembled into panels\n- manufacture of prefabricated buildings, or elements thereof, predominantly of wood\n- manufacture of mobile homes\n- manufacture of wood partitions (except free standing) Explanatory Note Exclusion: This class excludes:\n- manufacture of unassembled wooden flooring, see 1610\n- manufacture of kitchen cabinets, bookcases, wardrobes etc., see 3100\n- manufacture of wood partitions, free standing, see 3100",
	},
	{
		id: '05d800e5-554e-49b0-b657-6a3e35cc4432',
		name: '5912:Motion picture, video and television programme post-production activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5912 Description: Motion picture, video and television programme post-production activities Explanatory Note Inclusion: This class includes:\n- post-production activities such as:\n* editing, titling, subtitling, credits\n* closed captioning\n* computer-produced graphics, animation and special effects\n* film/tape transfers\n- activities of motion picture film laboratories and activities of special laboratories for animated films:\n* developing and processing motion picture film\n* reproduction of motion picture film for theatrical distribution\n\nThis class also includes:\n- activities of stock footage film libraries etc. Explanatory Note Exclusion: This class excludes:\n- film duplicating (except reproduction of motion picture film for theatrical distribution) as well as reproduction of audio and video tapes, CDs or DVDs from master copies, see 1820\n- wholesale of recorded video tapes, CDs, DVDs, see 4649\n- retail trade of video tapes, CDs, DVDs, see 4762\n- film processing other than for the motion picture industry, see 7420\n- renting of video tapes, DVDs to the general public, see 7722\n- activities of own account actors, cartoonists, directors, stage designers and technical specialists, see 9000',
	},
	{
		id: '6efd0a34-6588-4a82-b025-da0cf6d85bf5',
		name: '3099:Manufacture of other transport equipment n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3099 Description: Manufacture of other transport equipment n.e.c. Explanatory Note Inclusion: This class includes:\n- manufacture of hand-propelled vehicles: luggage trucks, handcarts, sledges, shopping carts etc.\n- manufacture of vehicles drawn by animals: sulkies, donkey-carts, hearses etc. Explanatory Note Exclusion: This class excludes:\n- works trucks, whether or not fitted with lifting or handling equipment, whether or not self-propelled, of the type used in factories (including hand trucks and wheelbarrows), see 2816\n- decorative restaurant carts, such as a desert cart, food wagons, see 3100',
	},
	{
		id: '5b30c143-5902-424b-bab3-a6f2afefd9a7',
		name: '291:Manufacture of motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 291 Description: Manufacture of motor vehicles Explanatory Note Inclusion: See class 2910. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd45ed509-13f1-45d6-bbd5-8c429ba2ac13',
		name: '63:Information service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 63 Description: Information service activities Explanatory Note Inclusion: This division includes the activities of web search portals, data processing and hosting activities, as well as other activities that primarily supply information. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8b66bca2-6c96-40ba-af07-3c899af56e76',
		name: '3900:Remediation activities and other waste management services',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3900 Description: Remediation activities and other waste management services Explanatory Note Inclusion: This class includes:\n- decontamination of soils and groundwater at the place of pollution, either in situ or ex situ, using e.g. mechanical, chemical or biological methods\n- decontamination of industrial plants or sites, including nuclear plants and sites\n- decontamination and cleaning up of surface water following accidental pollution, e.g. through collection of pollutants or through application of chemicals\n- cleaning up of oil spills and other pollutions on land, in surface water, in ocean and seas, including coastal areas\n- asbestos, lead paint, and other toxic material abatement\n- clearing of landmines and the like (including detonation)\n- other specialized pollution-control activities Explanatory Note Exclusion: This class excludes:\n- treatment and disposal of non-hazardous waste, see 3821\n- treatment and disposal of hazardous waste, see 3822\n- outdoor sweeping and watering of streets etc., see 8129',
	},
	{
		id: 'dd2aa7be-6ee5-4cf7-9b6f-d8d21af50a29',
		name: '4719:Other retail sale in non-specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4719 Description: Other retail sale in non-specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of a large variety of goods of which food products, beverages or tobacco are not predominant, such as:\n* retail sale activities of department stores carrying a general line of goods, including wearing apparel, furniture, appliances, hardware, cosmetics, jewellery, toys, sports goods etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '14017d83-379c-476c-8af9-a0b03ba3b484',
		name: '8550:Educational support activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8550 Description: Educational support activities Explanatory Note Inclusion: This class includes:\n- provision of non-instructional services that support educational processes or systems:\n* educational consulting\n* educational guidance counseling services\n* educational testing evaluation services\n* educational testing services\n* organization of student exchange programs Explanatory Note Exclusion: This class excludes:\n- research and experimental development on social sciences and humanities, see 7220',
	},
	{
		id: 'f135ca7f-3df4-4218-a04e-2e9b02f2ebe7',
		name: '0127:Growing of beverage crops',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0127 Description: Growing of beverage crops Explanatory Note Inclusion: This class includes:\n- growing of beverage crops:\n* coffee\n* tea\n* mat\u00e9\n* cocoa\n* other beverage crops Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '248c5f5e-aeb4-4aad-8273-4a5051cecf90',
		name: '80:Security and investigation activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 80 Description: Security and investigation activities Explanatory Note Inclusion: This division includes security-related services such as: investigation and detective services; guard and patrol services; picking up and delivering money, receipts, or other valuable items with personnel and equipment to protect such properties while in transit; operation of electronic security alarm systems, such as burglar and fire alarms, where the activity focuses on remote monitoring these systems, but often involves also sale, installation and repair services. If the latter components are provided separate, they are excluded from this division and classified in retail sale, construction etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4f3fe1ca-4fa6-4e3f-ad8c-f17ce448c23d',
		name: '8130:Landscape care and maintenance service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8130 Description: Landscape care and maintenance service activities Explanatory Note Inclusion: This class includes:\n- planting, care and maintenance of:\n* parks and gardens for:\n** private and public housing\n** public and semi-public buildings (schools, hospitals, administrative buildings, church buildings etc.)\n** municipal grounds (parks, green areas, cemeteries etc.)\n** highway greenery (roads, train lines and tramlines, waterways, ports)\n** industrial and commercial buildings\n* greenery for:\n** buildings (roof gardens, fa\u00e7ade greenery, indoor gardens)\n** sports grounds (e.g. football fields, golf courses etc.), play grounds, lawns for sunbathing and other recreational parks\n** stationary and flowing water (basins, alternating wet areas, ponds, swimming pools, ditches, watercourses, plant sewage systems)\n* plants for protection against noise, wind, erosion, visibility and dazzling\n\nThis class also includes:\n- maintenance of land in order to keep it in good ecological condition Explanatory Note Exclusion: This class excludes:\n- commercial production and planting for commercial production of plants, trees, see divisions 01 and 02\n- tree nurseries (except forest tree nurseries), see 0130\n- maintenance of land to keep it in good condition for agricultural use, see 0161\n- construction activities for landscaping purposes, see section F\n- landscape design and architecture activities, see 7110\n- operation of botanical gardens, see 9103',
	},
	{
		id: 'b3547cea-491c-4564-8cf1-12a290c51289',
		name: '5610:Restaurants and mobile food service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5610 Description: Restaurants and mobile food service activities Explanatory Note Inclusion: This class includes the provision of food services to customers, whether they are served while seated or serve themselves from a display of items, whether they eat the prepared meals on the premises, take them out or have them delivered. This includes the preparation and serving of meals for immediate consumption from motorized vehicles or non-motorized carts.\n\nThis class includes activities of:\n- restaurants\n- cafeterias\n- fast-food restaurants\n- pizza delivery\n- take-out eating places\n- ice cream truck vendors\n- mobile food carts\n- food preparation in market stalls\n\nThis class also includes:\n- restaurant and bar activities connected to transportation, when carried out by separate units Explanatory Note Exclusion: This class excludes:\n- concession operation of eating facilities, see 5629',
	},
	{
		id: 'ff535c16-6731-43fd-a7dc-a8a0d785610c',
		name: '9820:Undifferentiated service-producing activities of private households for own',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9820 Description: Undifferentiated service-producing activities of private households for own use Explanatory Note Inclusion: This class includes:\n- undifferentiated subsistence services-producing activities of households, i.e. the activities of households that are engaged in a variety of activities that produce services for their own subsistence. These activities include cooking, teaching, caring for household members and other services produced by the household for its own subsistence.\n\nIf households are also engaged in the production of multiple goods for subsistence purposes, they are classified to the undifferentiated goods-producing subsistence activities of households. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e64d1ba3-787f-4b41-bcab-d6edbcc05def',
		name: '791:Travel agency and tour operator activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 791 Description: Travel agency and tour operator activities Explanatory Note Inclusion: This group includes the activities of agencies, primarily engaged in selling travel, tour, transportation and accommodation services to the general public and commercial clients and the activity of arranging and assembling tours that are sold through travel agencies or directly by agents such as tour operators. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '56f4b20a-a69d-4e31-8ed0-fc361b37df59',
		name: '8549:Other education n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 8549 Description: Other education n.e.c. Explanatory Note Inclusion: This class includes the provision of instruction and specialized training, generally for adults, not comparable to the general education in groups 851-853. This class does not include activities of academic schools, colleges, and universities. Instruction may be provided in diverse settings, such as the unit's or client's training facilities, educational institutions, the workplace, or the home, and through correspondence, radio, television, Internet, in classrooms or by other means. Such instruction does not lead to a high school diploma, baccalaureate or graduate degree.\n\nThis class includes:\n- education that is not definable by level\n- academic tutoring services\n- college board preparation\n- learning centres offering remedial courses\n- professional examination review courses\n- language instruction and conversational skills instruction\n- speed reading instruction\n- religious instruction\n\nThis class also includes:\n- automobile driving schools\n- flying schools\n- lifeguard training\n- survival training\n- public speaking training\n- computer training Explanatory Note Exclusion: This class excludes:\n- adult literacy programmes see 8510\n- general secondary education, see 8521\n- driving schools for occupational drivers, see 8522\n- higher education, see 8530\n- cultural education, see 8542",
	},
	{
		id: '09da95e3-b171-49a6-93c1-4f6b933500e8',
		name: '1080:Manufacture of prepared animal feeds',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1080 Description: Manufacture of prepared animal feeds Explanatory Note Inclusion: This class includes:\n- manufacture of prepared feeds for pets, including dogs, cats, birds, fish etc.\n- manufacture of prepared feeds for farm animals, including animal feed concentrates and feed supplements\n- preparation of unmixed (single) feeds for farm animals\n\nThis class also includes:\n- treatment of slaughter waste to produce animal feeds Explanatory Note Exclusion: This class excludes:\n- production of fishmeal for animal feed, see 1020\n- production of oilseed cake, see 1040\n- activities resulting in by-products usable as animal feed without special treatment, e.g. oilseeds (see 1040), grain milling residues (see 1061) etc.',
	},
	{
		id: '422da2c0-b461-4943-96f9-ed7275835b0c',
		name: '35:Electricity, gas, steam and air conditioning supply',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 35 Description: Electricity, gas, steam and air conditioning supply Explanatory Note Inclusion: See section D. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '469b1619-37af-426a-9d23-afed42eb1c48',
		name: '855:Educational support activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 855 Description: Educational support activities Explanatory Note Inclusion: See class 8550. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '152e546c-0049-4f5e-a8c4-20bfcf98820b',
		name: '8530:Higher education',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8530 Description: Higher education Explanatory Note Inclusion: This class includes the provision of post-secondary non-tertiary and tertiary education, including granting of degrees at baccalaureate, graduate or post-graduate level. The requirement for admission is at least a high school diploma or equivalent general academic training. Education can be provided in classrooms or through radio, television broadcast, Internet or correspondence.\n\nThis class includes:\n- post-secondary non-tertiary education\n- first stage of tertiary education (not leading to an advanced research qualification)\n- second stage of tertiary education (leading to an advanced research qualification)\n\nThis class also includes:\n- performing arts schools providing higher education Explanatory Note Exclusion: This class excludes:\n- adult education as defined in group 854',
	},
	{
		id: '4e730cb4-bcec-413b-b1c5-6c6ef2998192',
		name: '47:Retail trade, except of motor vehicles and motorcycles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 47 Description: Retail trade, except of motor vehicles and motorcycles Explanatory Note Inclusion: This division includes the resale (sale without transformation) of new and used goods mainly to the general public for personal or household consumption or utilization, by shops, department stores, stalls, mail-order houses, hawkers and peddlers, consumer cooperatives etc.\n\nRetail trade is classified first by type of sale outlet (retail trade in stores: groups 471 to 477; retail trade not in stores: groups 478 and 479). Retail trade in stores includes the retail sale of used goods (class 4774). For retail sale in stores, there exists a further distinction between specialized retail sale (groups 472 to 477) and non-specialized retail sale (group 471). The above groups are further subdivided by the range of products sold. Sale not via stores is subdivided according to the forms of trade, such as retail sale via stalls and markets (group 478) and other non-store retail sale, e.g. mail order, door-to-door, by vending machines etc. (group 479).\n\nThe goods sold in this division are limited to goods usually referred to as consumer goods or retail goods. Therefore goods not usually entering the retail trade, such as cereal grains, ores, industrial machinery etc., are excluded. This division also includes units engaged primarily in selling to the general public, from displayed goods, products such as personal computers, stationery, paint or timber, although these sales may not be for personal or household use. Some processing of goods may be involved, but only incidental to selling, e.g. sorting or repackaging of goods, installation of a domestic appliance etc.\n\nThis division also includes the retail sale by commission agents and activities of retail auctioning houses.\n\nThis division excludes:\n- sale of farmers' products by farmers, see division 01\n- manufacture and sale of goods, which is generally classified as manufacturing in divisions 10-32\n- sale of motor vehicles, motorcycles and their parts, see division 45\n- trade in cereal grains, ores, crude petroleum, industrial chemicals, iron and steel and industrial machinery and equipment, see division 46\n- sale of food and drinks for consumption on the premises and sale of takeaway food, see division 56\n- renting of personal and household goods to the general public, see group 772 Explanatory Note Exclusion: [Empty]",
	},
	{
		id: '0a7788a0-7f92-4357-a771-090a4594424d',
		name: '473:Retail sale of automotive fuel in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 473 Description: Retail sale of automotive fuel in specialized stores Explanatory Note Inclusion: See class 4730. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '73d0b202-208a-4f4b-bae5-b84318c1da7f',
		name: '19:Manufacture of coke and refined petroleum products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 19 Description: Manufacture of coke and refined petroleum products Explanatory Note Inclusion: This division includes the transformation of crude petroleum and coal into usable products. The dominant process is petroleum refining, which involves the separation of crude petroleum into component products through such techniques as cracking and distillation. This division also includes the manufacture for own account of characteristic products (e.g. coke, butane, propane, petrol, kerosene, fuel oil etc.) as well as processing services (e.g. custom refining).\nThis division includes the manufacture of gases such as ethane, propane and butane as products of petroleum refineries. \n\nNot included is the manufacture of such gases in other units (2011), manufacture of industrial gases (2011), extraction of natural gas (methane, ethane, butane or propane) (0600), and manufacture of fuel gas, other than petroleum gases (e.g. coal gas, water gas, producer gas, gasworks gas) (35420).\nThe manufacture of petrochemicals from refined petroleum is classified in division 20. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '3fab2496-5a27-4bd7-8253-31afdbb1d486',
		name: '4330:Building completion and finishing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4330 Description: Building completion and finishing Explanatory Note Inclusion: This class includes:\n- application in buildings or other construction projects of interior and exterior plaster or stucco, including related lathing materials\n- installation of doors (except automated and revolving), windows, door and window frames, of wood or other materials\n- installation of fitted kitchens, staircases, shop fittings and the like\n- installation of furniture\n- interior completion such as ceilings, wooden wall coverings, movable partitions, etc.\n- laying, tiling, hanging or fitting in buildings or other construction projects of:\n* ceramic, concrete or cut stone wall or floor tiles, ceramic stove fitting\n* parquet and other wooden floor coverings\n* carpets and linoleum floor coverings, including of rubber or plastic\n* terrazzo, marble, granite or slate floor or wall coverings\n* wallpaper\n- interior and exterior painting of buildings\n- painting of civil engineering structures\n- installation of glass, mirrors, etc.\n- cleaning of new buildings after construction\n- other building completion work n.e.c.\n\nThis class also includes:\n- interior installation of shops, mobile homes, boats etc. Explanatory Note Exclusion: This class excludes:\n- painting of roads, see 4210\n- installation of automated and revolving doors, see 4329\n- general interior cleaning of buildings and other structures, see 8121\n- specialized interior and exterior cleaning of buildings, see 8129\n- activities of interior decoration designers, see 7410\n- assembly of self-standing furniture, see 9524',
	},
	{
		id: '42703319-9e5c-4894-9abb-9e3cd1a8fafe',
		name: '869:Other human health activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 869 Description: Other human health activities Explanatory Note Inclusion: See class 8690. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7516220e-6e84-4408-bf33-0d6b63444c86',
		name: '2410:Manufacture of basic iron and steel',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2410 Description: Manufacture of basic iron and steel Explanatory Note Inclusion: This class includes operations of conversion by reduction of iron ore in blast furnaces and oxygen converters or of ferrous waste and scrap in electric arc furnaces or by direct reduction of iron ore without fusion to obtain crude steel which is smelted and refined in a ladle furnace and then poured and solidified in a continuous caster in order to produce semi-finished flat or long products, which are used, after reheating, in rolling, drawing and extruding operations to manufacture finished products such as plate, sheet, strip, bars, rods, wire, tubes, pipes and hollow profiles.\n\nThis class includes:\n- operation of blast furnaces, steel converters, rolling and finishing mills\n- production of pig iron and spiegeleisen in pigs, blocks or other primary forms\n- production of ferro-alloys\n- production of ferrous products by direct reduction of iron and other spongy ferrous products\n- production of iron of exceptional purity by electrolysis or other chemical processes\n- production of granular iron and iron powder\n- production of steel in ingots or other primary forms\n- remelting of scrap ingots of iron or steel\n- production of semi-finished products of steel\n- manufacture of hot-rolled and cold-rolled flat-rolled products of steel\n- manufacture of hot-rolled bars and rods of steel\n- manufacture of hot-rolled open sections of steel\n- manufacture of steel bars and solid sections of steel by cold drawing, grinding or turning\n- manufacture of open sections by progressive cold forming on a roll mill or folding on a press of flat-rolled products of steel\n- manufacture of wire of steel by cold drawing or stretching\n- manufacture of sheet piling of steel and welded open sections of steel\n- manufacture of railway track materials (unassembled rails) of steel\n- manufacture of seamless tubes, pipes and hollow profiles of steel, by hot rolling, hot extrusion or hot drawing, or by cold drawing or cold rolling\n- manufacture of welded tubes and pipes of steel, by cold or hot forming and welding, delivered as welded or further processed by cold drawing or cold rolling or manufactured by hot forming, welding and reducing\n- manufacture of tube fittings of steel, such as:\n* flat flanges and flanges with forged collars\n* butt-welded fittings\n* threaded fittings\n* socket-welded fittings Explanatory Note Exclusion: This class excludes:\n- manufacture of tubes, pipes and hollow profiles and of tube or pipe fittings of cast-iron, see 2431\n- manufacture of seamless tubes and pipes of steel by centrifugal casting, see 2431\n- manufacture of tube or pipe fittings of cast-steel, see 2431',
	},
	{
		id: '06eb859b-f8c4-403f-805f-80e2680bcfc7',
		name: '5813:Publishing of newspapers, journals and periodicals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5813 Description: Publishing of newspapers, journals and periodicals Explanatory Note Inclusion: This class includes:\n- publishing of newspapers, including advertising newspapers\n- publishing of periodicals and other journals, including publishing of radio and television schedules\n\nPublishing can be done in print or electronic form, including on the Internet. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '21f37422-1275-4557-a409-b62632bb1eb5',
		name: '0322:Freshwater aquaculture',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0322 Description: Freshwater aquaculture Explanatory Note Inclusion: This class includes:\n- fish farming in freshwater including farming of freshwater ornamental fish\n- culture of freshwater crustaceans, bivalves, other molluscs and other aquatic animals\n- operation of fish hatcheries (freshwater)\n- farming of frogs Explanatory Note Exclusion: This class excludes:\n- aquaculture activities in salt water filled tanks and reservoirs, see 0321\n- operation of sport fishing preserves, see 9319',
	},
	{
		id: 'b69b4d6c-e7a9-4055-bb4c-c420649e6e71',
		name: '782:Temporary employment agency activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 782 Description: Temporary employment agency activities Explanatory Note Inclusion: See class 7820. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4796843d-612a-4547-8c8b-187fc32f62d9',
		name: '612:Wireless telecommunications activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 612 Description: Wireless telecommunications activities Explanatory Note Inclusion: See class 6120. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '27550de7-2bf3-4c3c-86d5-810e99bb4a47',
		name: '9522:Repair of household appliances and home and garden equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9522 Description: Repair of household appliances and home and garden equipment Explanatory Note Inclusion: This class includes:\n- repair and servicing of household appliances\n* refrigerators, stoves, washing machines, clothes dryers, room air conditioners, etc.\n- repair and servicing of home and garden equipment\n* lawnmowers, edgers, snow- and leaf- blowers, trimmers, etc. Explanatory Note Exclusion: This class excludes:\n- repair of hand held power tools, see 3312\n- repair of central air conditioning systems, see 4322',
	},
	{
		id: '626058ef-449c-4d53-913d-8701c89127ef',
		name: '2432:Casting of non-ferrous metals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2432 Description: Casting of non-ferrous metals Explanatory Note Inclusion: This class includes:\n- casting of semi-finished products of aluminium, magnesium, titanium, zinc etc.\n- casting of light metal castings\n- casting of heavy metal castings\n- casting of precious metal castings\n- die-casting of non-ferrous metal castings Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '6e4f7d06-fafa-4055-be84-7fdc3985e617',
		name: '581:Publishing of books, periodicals and other publishing activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 581 Description: Publishing of books, periodicals and other publishing activities Explanatory Note Inclusion: This group includes activities of publishing books, newspapers, magazines and other periodicals, directories and mailing lists, and other works such as photos, engravings, postcards, timetables, forms, posters and reproductions of works of art. These works are characterized by the intellectual creativity required in their development and are usually protected by copyright. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5e94e265-3225-458d-9835-e9db274e2870',
		name: '3320:Installation of industrial machinery and equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3320 Description: Installation of industrial machinery and equipment Explanatory Note Inclusion: This class includes the specialized installation of machinery. However, the installation of equipment that forms an integral part of buildings or similar structures, such as installation of escalators, electrical wiring, burglar alarm systems or air-conditioning systems, is classified as construction.\n\nThis class includes:\n- installation of industrial machinery in industrial plant\n- installation of industrial process control equipment\n- installation of other industrial equipment, e.g.:\n* communications equipment\n* mainframe and similar computers\n* irradiation and electromedical equipment etc.\n- dismantling large-scale machinery and equipment\n- activities of millwrights\n- machine rigging\n- installation of bowling alley equipment Explanatory Note Exclusion: This class excludes:\n- installation of electrical wiring, burglar alarm systems, see 4321\n- installation of air-conditioning systems, see 4322\n- installation of elevators, escalators, automated doors, vacuum cleaning systems etc., see 4329\n- installation of doors, staircases, shop fittings, furniture etc., see 4330\n- installation (setting-up) of personal computers, see 6209',
	},
	{
		id: '9f42fecf-81e8-4e8d-b52f-bc99b25c49ad',
		name: '454:Sale, maintenance and repair of motorcycles and related parts and accessorie',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 454 Description: Sale, maintenance and repair of motorcycles and related parts and accessories Explanatory Note Inclusion: See class 4540. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '47c1e228-020a-4922-a8f6-526c283b783d',
		name: '31:Manufacture of furniture',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 31 Description: Manufacture of furniture Explanatory Note Inclusion: This division includes the manufacture of furniture and related products of any material except stone, concrete and ceramic. The processes used in the manufacture of furniture are standard methods of forming materials and assembling components, including cutting, moulding and laminating. The design of the article, for both aesthetic and functional qualities, is an important aspect of the production process.\n\nSome of the processes used in furniture manufacturing are similar to processes that are used in other segments of manufacturing. For example, cutting and assembly occurs in the production of wood trusses that are classified in division 16 (Manufacture of wood and wood products). However, the multiple processes distinguish wood furniture manufacturing from wood product manufacturing. Similarly, metal furniture manufacturing uses techniques that are also employed in the manufacturing of roll-formed products classified in division 25 (Manufacture of fabricated metal products). The molding process for plastics furniture is similar to the molding of other plastics products. However, the manufacture of plastics furniture tends to be a specialized activity. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '838125d0-3b57-46bb-8337-4a1ce3a3f8ed',
		name: '9319:Other sports activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9319 Description: Other sports activities Explanatory Note Inclusion: This class includes:\n- activities of producers or promoters of sports events, with or without facilities\n- activities of individual own-account sportsmen and athletes, referees, judges, timekeepers etc.\n- activities of sports leagues and regulating bodies\n- activities related to promotion of sporting events\n- activities of racing stables, kennels and garages\n- operation of sport fishing and hunting preserves\n- activities of mountain guides\n- support activities for sport or recreational hunting and fishing Explanatory Note Exclusion: This class excludes:\n- breeding of racing horses, see 0142\n- renting of sports equipment, see 7721\n- activities of sport and game schools, see 8541\n- activities of sports instructors, teachers, coaches, see 8541\n- organization and operation of outdoor or indoor sports events for professionals or amateurs by sports clubs with/without own facilities, see 9311, 9312\n- park and beach activities, see 9329',
	},
	{
		id: 'b66fc303-7cab-45c0-899d-be313f2dc970',
		name: 'J62-J63: Computer programming, consultancy and related activities; information service activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Computer programming, consultancy and related activities; information service activities',
	},
	{
		id: 'e26aed7b-4c01-4618-a0e1-7a996e3a7eb9',
		name: '87:Residential care activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 87 Description: Residential care activities Explanatory Note Inclusion: This division includes the provision of residential care combined with either nursing, supervisory or other types of care as required by the residents. Facilities are a significant part of the production process and the care provided is a mix of health and social services with the health services being largely some level of nursing services. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4ff96806-9b38-483e-b153-6ef5b7c95857',
		name: '3100:Manufacture of furniture',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3100 Description: Manufacture of furniture Explanatory Note Inclusion: This class includes the manufacture of furniture of any kind, any material (except stone, concrete or ceramic) for any place and various purposes.\n\nThis class includes:\n- manufacture of chairs and seats for offices, workrooms, hotels, restaurants, public and domestic premises\n- manufacture of chairs and seats for theatres, cinemas and the like\n- manufacture of sofas, sofa beds and sofa sets\n- manufacture of garden chairs and seats\n- manufacture of special furniture for shops: counters, display cases, shelves etc.\n- manufacture of furniture for churches, schools, restaurants\n- manufacture of office furniture\n- manufacture of kitchen furniture\n- manufacture of furniture for bedrooms, living rooms, gardens etc.\n- manufacture of cabinets for sewing machines, televisions etc.\n- manufacture of laboratory benches, stools and other laboratory seating, laboratory furniture (e.g. cabinets and tables)\n\nThis class also includes:\n- finishing such as upholstery of chairs and seats\n- finishing of furniture such as spraying, painting, French polishing and upholstering\n- manufacture of mattress supports\n- manufacture of mattresses:\n* mattresses fitted with springs or stuffed or internally fitted with a supporting material\n* uncovered cellular rubber or plastic mattresses\n- decorative restaurant carts, such as dessert carts, food wagons Explanatory Note Exclusion: This class excludes:\n- manufacture of pillows, pouffes, cushions, quilts and eiderdowns, see 1392\n- manufacture of inflatable rubber mattresses, see 2219\n- manufacture of furniture of ceramics, concrete and stone, see 2393, 2395, 2396\n- manufacture of lighting fittings or lamps, see 2740\n- blackboards, see 2817\n- manufacture of car seats, railway seats, aircraft seats, see 2930, 3020, 3030\n- modular furniture attachment and installation, partition installation, laboratory equipment furniture installation, see 4330',
	},
	{
		id: '4c30bbfb-a4ef-4588-8473-a1209a8943ae',
		name: '5229:Other transportation support activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5229 Description: Other transportation support activities Explanatory Note Inclusion: This class includes:\n- forwarding of freight\n- arranging or organizing of transport operations by rail, road, sea or air\n- organization of group and individual consignments (including pickup and delivery of goods and grouping of consignments)\n- logistics activities, i.e. planning, designing and supporting operations of transportation, warehousing and distribution\n- issue and procurement of transport documents and waybills\n- activities of customs agents\n- activities of sea-freight forwarders and air-cargo agents\n- brokerage for ship and aircraft space\n- goods-handling operations, e.g. temporary crating for the sole purpose of protecting the goods during transit, uncrating, sampling, weighing of goods Explanatory Note Exclusion: This class excludes:\n- courier activities, see 5320\n- provision of motor, marine, aviation and transport insurance, see 6512\n- activities of travel agencies, see 7911\n- activities of tour operators, see 7912\n- tourist assistance activities, see 7990',
	},
	{
		id: '129122cd-51ff-481d-ab86-ae74c42b61d6',
		name: '5320:Courier activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5320 Description: Courier activities Explanatory Note Inclusion: This class includes courier activities not operating under a universal service obligation.\n\nThis class includes:\n- pickup, sorting, transport and delivery (domestic or international) of letter-post and (mail-type) parcels and packages by firms not operating under a universal service obligation. One or more modes of transport may be involved and the activity may be carried out with either self-owned (private) transport or via public transport.\n- distribution and delivery of mail and parcels\n\nThis class also includes:\n- home delivery services Explanatory Note Exclusion: This class excludes:\n- transport of freight, see (according to mode of transport) 4912, 4923, 5012, 5022, 5120',
	},
	{
		id: 'd3443445-0730-441b-8b53-faf34c588378',
		name: '601:Radio broadcasting',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 601 Description: Radio broadcasting Explanatory Note Inclusion: See class 6010. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8437a07e-6419-409a-86f3-11334981c8cd',
		name: '95:Repair of computers and personal and household goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 95 Description: Repair of computers and personal and household goods Explanatory Note Inclusion: This division includes the repair and maintenance of computers peripheral equipment such as desktops, laptops, computer terminals, storage devices and printers. It also includes the repair of communications equipment such as fax machines, two-way radios and consumer electronics such as radios and TVs, home and garden equipment such as lawn-mowers and blowers, footwear and leather goods, furniture and home furnishings, clothing and clothing accessories, sporting goods, musical instruments, hobby articles and other personal and household goods.\n\nExcluded from this division is the repair of medical and diagnostic imaging equipment, measuring and surveying instruments, laboratory instruments, radar and sonar equipment, see 3313. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '73b733ef-8a14-44a9-99c5-3dbf835748a9',
		name: '5221:Service activities incidental to land transportation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5221 Description: Service activities incidental to land transportation Explanatory Note Inclusion: This class includes:\n- activities related to land transport of passengers, animals or freight:\n* operation of terminal facilities such as railway stations, bus stations, stations for the handling of goods\n* operation of railroad infrastructure\n* operation of roads, bridges, tunnels, car parks or garages, bicycle parkings\n- switching and shunting\n- towing and road side assistance\n\nThis class also includes:\n- liquefaction of gas for transportation purposes Explanatory Note Exclusion: This class excludes:\n- cargo handling, see 5224',
	},
	{
		id: '91897a60-b8fd-4504-9b8d-6af8df1b8a5f',
		name: '0893:Extraction of salt',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0893 Description: Extraction of salt Explanatory Note Inclusion: This class includes:\n- extraction of salt from underground including by dissolving and pumping\n- salt production by evaporation of sea water or other saline waters\n- crushing, purification and refining of salt by the producer Explanatory Note Exclusion: This class excludes:\n- processing of salt into food-grade salt, e.g. iodized salt, see 1079\n- potable water production by evaporation of saline water, see 3600',
	},
	{
		id: '8a0b0db7-61d8-40aa-9d81-6e0718ac3b98',
		name: '4774:Retail sale of second-hand goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4774 Description: Retail sale of second-hand goods Explanatory Note Inclusion: This class includes:\n- retail sale of second-hand books\n- retail sale of other second-hand goods\n- retail sale of antiques\n- activities of auctioning houses (retail) Explanatory Note Exclusion: This class excludes:\n- retail sale of second-hand motor vehicles, see 4510\n- activities of Internet auctions and other non-store auctions (retail), see 4791, 4799\n- activities of pawn shops, see 6492',
	},
	{
		id: 'd4716931-ba21-4ccd-9ef2-22d06ce77e79',
		name: '72:Scientific research and development',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 72 Description: Scientific research and development Explanatory Note Inclusion: This division includes the activities of three types of research and development: 1) basic research: experimental or theoretical work undertaken primarily to acquire new knowledge of the underlying foundations of phenomena and observable facts, without particular application or use in view, 2) applied research: original investigation undertaken in order to acquire new knowledge, directed primarily towards a specific practical aim or objective and 3) experimental development: systematic work, drawing on existing knowledge gained from research and/or practical experience, directed to producing new materials, products and devices, to installing new processes, systems and services, and to improving substantially those already produced or installed.\n\nResearch and experimental development activities in this division are subdivided into two categories: natural sciences and engineering; social sciences and the humanities.\n\nThis division excludes market research (see class 7320). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '355d7ab4-e479-47a6-9066-589aff5ee894',
		name: '79:Travel agency, tour operator, reservation service and related activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 79 Description: Travel agency, tour operator, reservation service and related activities Explanatory Note Inclusion: This division includes the activity of selling travel, tour, transportation and accommodation services to the general public and commercial clients and the activity of arranging and assembling tours that are sold through travel agencies or directly by agents such as tour operators, as well as other travel-related services including reservation services. The activities of tourist guides and tourism promotion activities are also included. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '01b19d6a-4ae0-40cd-842e-8bef220702b6',
		name: '0710:Mining of iron ores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0710 Description: Mining of iron ores Explanatory Note Inclusion: This class includes:\n- mining of ores valued chiefly for iron content\n- beneficiation and agglomeration of iron ores Explanatory Note Exclusion: This class excludes:\n- extraction and preparation of pyrites and pyrrhotite (except roasting), see 0891',
	},
	{
		id: '3a88c807-ac15-4a63-8222-6c2b85358f00',
		name: '8121:General cleaning of buildings',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8121 Description: General cleaning of buildings Explanatory Note Inclusion: This class includes:\n- general (non-specialized) cleaning of all types of buildings, such as:\n* offices \n* houses or apartments\n* factories \n* shops \n* institutions\n- general (non-specialized) cleaning of other business and professional premises and multiunit residential buildings\n\nThese activities cover mostly interior cleaning although they may include the cleaning of associated exterior areas such as windows or passageways. Explanatory Note Exclusion: This class excludes:\n- specialized interior cleaning activities, such as chimney cleaning, cleaning of fireplaces, stoves, furnaces, incinerators, boilers, ventilation ducts, exhaust units, see 8129',
	},
	{
		id: '83057f9a-d314-4830-a51f-901cb9c3f763',
		name: '2829:Manufacture of other special-purpose machinery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2829 Description: Manufacture of other special-purpose machinery Explanatory Note Inclusion: This class includes the manufacture of special-purpose machinery not elsewhere classified.\n\nThis class includes:\n- manufacture of machinery for making paper pulp\n- manufacture of paper and paperboard making machinery\n- manufacture of dryers for wood, paper pulp, paper or paperboard\n- manufacture of machinery producing articles of paper or paperboard\n- manufacture of machinery for working soft rubber or plastics or for the manufacture of products of these materials:\n* extruders, moulders, pneumatic tyre making or retreading machines and other machines for making a specific rubber or plastic product\n- manufacture of printing and bookbinding machines and machines for activities supporting printing on a variety of materials \n- manufacture of machinery for producing tiles, bricks, shaped ceramic pastes, pipes, graphite electrodes, blackboard chalk, foundry moulds etc. \n- manufacture of semi-conductor manufacturing machinery\n- manufacture of industrial robots performing multiple tasks for special purposes\n- manufacture of diverse special-purpose machinery and equipment:\n* machines to assemble electric or electronic lamps, tubes (valves) or bulbs\n* machines for production or hot-working of glass or glassware, glass fibre or yarn\n* machinery or apparatus for isotopic separation\n- manufacture of tire alignment and balancing equipment; balancing equipment (except wheel balancing)\n- manufacture of central greasing systems\n- manufacture of aircraft launching gear, aircraft carrier catapults and related equipment\n- manufacture of automatic bowling alley equipment (e.g. pin-setters)\n- manufacture of roundabouts, swings, shooting galleries and other fairground amusements Explanatory Note Exclusion: This class excludes:\n- manufacture of household appliances, see 2750\n- manufacture of photocopy machines etc., see 2817\n- manufacture of machinery or equipment to work hard rubber, hard plastics or cold glass, see 2822\n- manufacture of ingot moulds, see 2823\n- manufacture of textile printing machinery, see 2826',
	},
	{
		id: 'ccc892d3-b30b-41ff-92eb-71ea270ba4f6',
		name: '143:Manufacture of knitted and crocheted apparel',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 143 Description: Manufacture of knitted and crocheted apparel Explanatory Note Inclusion: See class 1430. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f86226bb-b5a3-4c0b-b829-c9ce18a714de',
		name: '2821:Manufacture of agricultural and forestry machinery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2821 Description: Manufacture of agricultural and forestry machinery Explanatory Note Inclusion: This class includes:\n- manufacture of tractors used in agriculture and forestry\n- manufacture of walking (pedestrian-controlled) tractors\n- manufacture of mowers, including lawnmowers\n- manufacture of agricultural self-loading or self-unloading trailers or semi-trailers\n- manufacture of agricultural machinery for soil preparation, planting or fertilizing:\n* ploughs, manure spreaders, seeders, harrows etc.\n- manufacture of harvesting or threshing machinery:\n* harvesters, threshers, sorters etc.\n- manufacture of milking machines\n- manufacture of spraying machinery for agricultural use\n- manufacture of diverse agricultural machinery:\n* poultry-keeping machinery, bee-keeping machinery, equipment for preparing fodder etc.\n* machines for cleaning, sorting or grading eggs, fruit etc. Explanatory Note Exclusion: This class excludes:\n- manufacture of non-power-driven agricultural hand tools, see 2593\n- manufacture of conveyors for farm use, see 2816\n- manufacture of power-driven hand tools, see 2818\n- manufacture of cream separators, see 2825\n- manufacture of machinery to clean, sort or grade seed, grain or dried leguminous vegetables, see 2825\n- manufacture of road tractors for semi-trailers, see 2910\n- manufacture of road trailers or semi-trailers, see 2920',
	},
	{
		id: 'fbcfe2c1-c31f-43f6-80f9-54cf5e867966',
		name: '5811:Book publishing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5811 Description: Book publishing Explanatory Note Inclusion: This class includes the activities of publishing books in print, electronic (CD, electronic displays etc.) or audio form or on the Internet.\n\nThis class includes:\n- publishing of books, brochures, leaflets and similar publications, including publishing of dictionaries and encyclopedias\n- publishing of atlases, maps and charts\n- publishing of audio books\n- publishing of encyclopedias etc. on CD-ROM Explanatory Note Exclusion: This class excludes:\n- production of globes, see 3290\n- publishing of advertising material, see 5819\n- publishing of music and sheet books, see 5920\n- activities of independent authors, see 9000',
	},
	{
		id: '44d5290c-e18a-4344-959e-f941f3d5dfbf',
		name: 'J:Information and communication',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: J Description: Information and communication Explanatory Note Inclusion: This section includes the production and distribution of information and cultural products, the provision of the means to transmit or distribute these products, as well as data or communications, information technology activities and the processing of data and other information service activities.\n\nThe main components of this section are publishing activities (division 58), including software publishing, motion picture and sound recording activities (division 59), radio and TV broadcasting and programming activities (division 60), telecommunications activities (division 61) and information technology activities (division 62) and other information service activities (division 63).\n\nPublishing includes the acquisition of copyrights to content (information products) and making this content available to the general public by engaging in (or arranging for) the reproduction and distribution of this content in various forms. All the feasible forms of publishing (in print, electronic or audio form, on the internet, as multimedia products such as CD-ROM reference books etc.) are included in this section.\n\nActivities related to production and distribution of TV programming span divisions 59, 60 and 61, reflecting different stages in this process. Individual components, such as movies, television series etc. are produced by activities in division 59, while the creation of a complete television channel programme, from components produced in division 59 or other components (such as live news programming) is included in division 60. Division 60 also includes the broadcasting of this programme by the producer. The distribution of the complete television programme by third parties, i.e. without any alteration of the content, is included in division 61. This distribution in division 61 can be done through broadcasting, satellite or cable systems. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4627e802-3482-4895-ae5c-cab9840d551b',
		name: '4520:Maintenance and repair of motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4520 Description: Maintenance and repair of motor vehicles Explanatory Note Inclusion: This class includes:\n- maintenance and repair of motor vehicles:\n* mechanical repairs\n* electrical repairs\n* electronic injection systems repair\n* ordinary servicing\n* bodywork repair\n* repair of motor vehicle parts\n* washing, polishing, etc.\n* spraying and painting\n* repair of screens and windows\n* repair of motor vehicle seats\n- tyre and tube repair, fitting or replacement\n- anti-rust treatment\n- installation of parts and accessories not as part of the manufacturing process Explanatory Note Exclusion: This class excludes:\n- retreading and rebuilding of tyres, see 2211',
	},
	{
		id: 'b35768cb-9741-4b5c-8b82-6a1374462917',
		name: '017:Hunting, trapping and related service activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 017 Description: Hunting, trapping and related service activities Explanatory Note Inclusion: See class 0170. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8b5914d7-56fe-452c-83bd-7b6345a57f63',
		name: '2391:Manufacture of refractory products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2391 Description: Manufacture of refractory products Explanatory Note Inclusion: This class includes:\n- manufacture of refractory mortars, concretes etc.\n- manufacture of refractory ceramic goods:\n* heat-insulating ceramic goods of siliceous fossil meals\n* refractory bricks, blocks and tiles etc.\n* retorts, crucibles, muffles, nozzles, tubes, pipes etc.\n\nThis class also includes:\n- manufacture of refractory articles containing magnesite, dolomite or chromite Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd51f6df8-cf2c-4b9d-bffc-fe3faa398122',
		name: '01:Crop and animal production, hunting and related service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 01 Description: Crop and animal production, hunting and related service activities Explanatory Note Inclusion: This division includes two basic activities, namely the production of crop products and production of animal products, covering also the forms of organic agriculture, the growing of genetically modified crops and the raising of genetically modified animals. \n\nThis division also includes service activities incidental to agriculture, as well as hunting, trapping and related activities.\n\nGroup 015 (Mixed farming) breaks with the usual principles for identifying main activity. It accepts that many agricultural holdings have reasonably balanced crop and animal production and that it would be arbitrary to classify them in one category or the other.\n\nAgricultural activities exclude any subsequent processing of the agricultural products (classified under divisions 10 and 11 (Manufacture of food products and beverages) and division 12 (Manufacture of tobacco products)), beyond that needed to prepare them for the primary markets. However, the preparation of products for the primary markets is included here.\n\nThe division excludes field construction (e.g. agricultural land terracing, drainage, preparing rice paddies etc.) classified in section F (Construction) and buyers and cooperative associations engaged in the marketing of farm products classified in section G. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '8f8fb6f8-42dc-4928-8f67-b9c4ec076574',
		name: '5820:Software publishing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5820 Description: Software publishing Explanatory Note Inclusion: This class includes:\n- publishing of ready-made (non-customized) software:\n* operating systems\n* business and other applications\n* computer games for all platforms Explanatory Note Exclusion: This class excludes:\n- reproduction of software, see 1820 \n- retail sale of non-customized software, see 4741\n- production of software not associated with publishing, see 6201\n- on-line provision of software (application hosting and application service provisioning), see 6311',
	},
	{
		id: '3be42819-b40d-4393-98d1-435589306866',
		name: '1394:Manufacture of cordage, rope, twine and netting',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 1394 Description: Manufacture of cordage, rope, twine and netting Explanatory Note Inclusion: This class includes:\n- manufacture of twine, cordage, rope and cables of textile fibres or strip or the like, whether or not impregnated, coated, covered or sheathed with rubber or plastics\n- manufacture of knotted netting of twine, cordage or rope\n- manufacture of products of rope or netting: fishing nets, ships' fenders, unloading cushions, loading slings, rope or cable fitted with metal rings etc. Explanatory Note Exclusion: This class excludes:\n- manufacture of hairnets, see 1410\n- manufacture of wire rope, see 2599",
	},
	{
		id: '5e55da90-9449-4df6-a211-dc9fdbdb2864',
		name: '563:Beverage serving activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 563 Description: Beverage serving activities Explanatory Note Inclusion: See class 5630. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '41dd8d1a-f55d-41bc-817d-3f09a53651ae',
		name: '475:Retail sale of other household equipment in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 475 Description: Retail sale of other household equipment in specialized stores Explanatory Note Inclusion: This group includes the retail sale of household equipment, such as textiles, hardware, carpets, electrical appliances or furniture, in specialized stores. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4f4a6ec3-e17a-4ad4-b431-691ea4cc9407',
		name: '5223:Service activities incidental to air transportation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5223 Description: Service activities incidental to air transportation Explanatory Note Inclusion: This class includes:\n- activities related to air transport of passengers, animals or freight:\n* operation of terminal facilities such as airway terminals etc.\n* airport and air-traffic-control activities\n* ground service activities on airfields etc.\n\nThis class also includes:\n- firefighting and fire-prevention services at airports Explanatory Note Exclusion: This class excludes:\n- cargo handling, see 5224\n- operation of flying schools, see 8530, 8549',
	},
	{
		id: 'fcf3ada8-21f2-4877-a5bd-9d858033128c',
		name: '281:Manufacture of general-purpose machinery',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 281 Description: Manufacture of general-purpose machinery Explanatory Note Inclusion: This group includes the manufacture of general-purpose machinery, i.e. machinery that is being used in a wide range of ISIC industries. This can include the manufacture of components used in the manufacture of a variety of other machinery or the manufacture of machinery that support the operation of other businesses. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'be3540ee-592f-46fd-bd68-c362a3bbccc6',
		name: '3530:Steam and air conditioning supply',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3530 Description: Steam and air conditioning supply Explanatory Note Inclusion: This class includes:\n- production, collection and distribution of steam and hot water for heating, power and other purposes\n- production and distribution of cooled air\n- production and distribution of chilled water for cooling purposes\n- production of ice, including ice for food and non-food (e.g. cooling) purposes Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'de9d2749-7a44-40f7-aee9-f48c95a42ed2',
		name: '4661:Wholesale of solid, liquid and gaseous fuels and related products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4661 Description: Wholesale of solid, liquid and gaseous fuels and related products Explanatory Note Inclusion: This class includes:\n- wholesale of fuels, greases, lubricants, oils such as:\n* charcoal, coal, coke, fuel wood, naphtha\n* crude petroleum, crude oil, diesel fuel, gasoline, fuel oil, heating oil, kerosene\n* liquefied petroleum gases, butane and propane gas\n* lubricating oils and greases, refined petroleum products Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4e0c4ef3-53c9-4581-92f6-0d999d193450',
		name: '722:Research and experimental development on social sciences and humanities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 722 Description: Research and experimental development on social sciences and humanities Explanatory Note Inclusion: See class 7220. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'be4c61d8-e321-413f-b505-030afee8cb9a',
		name: '4312:Site preparation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4312 Description: Site preparation Explanatory Note Inclusion: This class includes the preparation of sites for subsequent construction activities.\n\nThis class includes:\n- clearing of building sites\n- earth moving: excavation, landfill, levelling and grading of construction sites, trench digging, rock removal, blasting, etc.\n- drilling, boring and core sampling for construction, geophysical, geological or similar purposes\n\nThis class also includes:\n- site preparation for mining:\n* overburden removal and other development and preparation of mineral properties and sites, except oil and gas sites\n- building site drainage\n- drainage of agricultural or forestry land Explanatory Note Exclusion: This class excludes:\n- drilling of production oil or gas wells, see 0610, 0620\n- test drilling and test hole boring for mining operations (other than oil and gas extraction), see 0990\n- decontamination of soil, see 3900\n- water well drilling, see 4220\n- shaft sinking, see 4390\n- oil and gas field exploration, geophysical, geological and seismic surveying, see 7110',
	},
	{
		id: '89f1fee3-adf1-450e-bfcc-282376ffb46a',
		name: '2030:Manufacture of man-made fibres',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2030 Description: Manufacture of man-made fibres Explanatory Note Inclusion: This class includes:\n- manufacture of synthetic or artificial filament tow\n- manufacture of synthetic or artificial staple fibres, not carded, combed or otherwise processed for spinning\n- manufacture of synthetic or artificial filament yarn, including high-tenacity yarn\n- manufacture of synthetic or artificial monofilament or strip Explanatory Note Exclusion: This class excludes:\n- spinning of synthetic or artificial fibres, see 1311\n- manufacture of yarns made of man-made staple, see 1311',
	},
	{
		id: 'b41f610a-7dea-4a9a-96d3-54534fa6111f',
		name: '6391:News agency activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6391 Description: News agency activities Explanatory Note Inclusion: This class includes:\n- news syndicate and news agency activities furnishing news, pictures and features to the media Explanatory Note Exclusion: This class excludes:\n- activities of independent photojournalists, see 7420\n- activities of independent journalists, see 9000',
	},
	{
		id: '8f8cf6a0-c658-45de-b7dd-70df6c42c221',
		name: '7320:Market research and public opinion polling',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7320 Description: Market research and public opinion polling Explanatory Note Inclusion: This class includes:\n- investigation into market potential, acceptance and familiarity of products and buying habits of consumers for the purpose of sales promotion and development of new products, including statistical analyses of the results\n- investigation into collective opinions of the public about political, economic and social issues and statistical analysis thereof Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b01713df-758e-4261-86ad-0b4c59d82d39',
		name: '6201:Computer programming activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 6201 Description: Computer programming activities Explanatory Note Inclusion: This class includes the writing, modifying, testing and supporting of software.\n\nThis class includes:\n- designing the structure and content of, and/or writing the computer code necessary to create and implement:\n* systems software (including updates and patches)\n* software applications (including updates and patches)\n* databases\n* web pages\n- customizing of software, i.e. modifying and configuring an existing application so that it is functional within the clients' information system environment Explanatory Note Exclusion: This class excludes:\n- publishing packaged software, see 5820\n- planning and designing computer systems that integrate computer hardware, software and communication technologies, even though providing software might be an integral part, see 6202",
	},
	{
		id: 'f85962c5-e772-4b02-bd40-58329e3a0ee0',
		name: '82:Office administrative, office support and other business support activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 82 Description: Office administrative, office support and other business support activities Explanatory Note Inclusion: This division includes the provision of a range of day-to-day office administrative services, as well as ongoing routine business support functions for others, on a contract or fee basis.\nThis division also includes all support service activities typically provided to businesses not elsewhere classified.\nUnits classified in this division do not provide operating staff to carry out the complete operations of a business. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e3ef814c-9f70-45e8-a0fa-d8ead067729d',
		name: '501:Sea and coastal water transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 501 Description: Sea and coastal water transport Explanatory Note Inclusion: This group includes the transport of passengers or freight on vessels designed for operating on sea or coastal waters. Also included is the transport of passengers or freight on great lakes etc. when similar types of vessels are used. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f9da0e69-150a-4d71-aa9a-e78f76d7ad26',
		name: '8299:Other business support service activities n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8299 Description: Other business support service activities n.e.c. Explanatory Note Inclusion: This class includes:\n- providing verbatim reporting and stenotype recording of live legal proceedings and transcribing subsequent recorded materials, such as:\n* court reporting or stenotype recording services\n* public stenography services\n- real-time (i.e. simultaneous) closed captioning of live television performances of meetings, conferences \n- address bar coding services\n- bar code imprinting services\n- fundraising organization services on a contract or fee basis\n- mail presorting services\n- repossession services\n- parking meter coin collection services\n- activities of independent auctioneers \n- administration of loyalty programmes\n- other support activities typically provided to businesses not elsewhere classified Explanatory Note Exclusion: This class excludes:\n- provision of document transcription services, see 8219\n- providing film or tape captioning or subtitling services, see 5912',
	},
	{
		id: '0be6a9d2-c32c-4a3a-8954-609819dfd001',
		name: '631:Data processing, hosting and related activities; web portals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 631 Description: Data processing, hosting and related activities; web portals Explanatory Note Inclusion: This group includes the provision of infrastructure for hosting, data processing services and related activities, as well as the provision of search facilities and other portals for the Internet. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f4a849f3-9172-404c-9834-37fae8cda5ff',
		name: '2620:Manufacture of computers and peripheral equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 2620 Description: Manufacture of computers and peripheral equipment Explanatory Note Inclusion: This class includes the manufacture and/or assembly of electronic computers, such as mainframes, desktop computers, laptops and computer servers; and computer peripheral equipment, such as storage devices and input/output devices (printers, monitors, keyboards). Computers can be analog, digital, or hybrid. Digital computers, the most common type, are devices that do all of the following: (1) store the processing program or programs and the data immediately necessary for the execution of the program, (2) can be freely programmed in accordance with the requirements of the user, (3) perform arithmetical computations specified by the user and (4) execute, without human intervention, a processing program that requires the computer to modify its execution by logical decision during the processing run. Analog computers are capable of simulating mathematical models and comprise at least analog control and programming elements.\n\nThis class includes:\n- manufacture of desktop computers\n- manufacture of laptop computers\n- manufacture of main frame computers\n- manufacture of hand-held computers (e.g. PDA)\n- manufacture of magnetic disk drives, flash drives and other storage devices\n- manufacture of optical (e.g. CD-RW, CD-ROM, DVD-ROM, DVD-RW) disk drives\n- manufacture of printers\n- manufacture of monitors\n- manufacture of keyboards\n- manufacture of all types of mice, joysticks, and trackball accessories\n- manufacture of dedicated computer terminals\n- manufacture of computer servers\n- manufacture of scanners, including bar code scanners\n- manufacture of smart card readers\n- manufacture of virtual reality helmets\n- manufacture of computer projectors (video beamers)\n\nThis class also includes:\n- manufacture of computer terminals, like automatic teller machines (ATM's), point-of-sale (POS) terminals, not mechanically operated\n- manufacture of multi-function office equipment, such as fax-scanner-copier combinations Explanatory Note Exclusion: This class excludes:\n- reproduction of recorded media (computer media, sound, video, etc.), see 1820\n- manufacture of electronic components and electronic assemblies used in computers and peripherals, see 2610\n- manufacture of internal/external computer modems, see 2610\n- manufacture of interface cards, modules and assemblies, see 2610\n- manufacture of modems, carrier equipment, see 2630\n- manufacture of digital communication switches, data communications equipment (e.g. bridges, routers, gateways), see 2630\n- manufacture of consumer electronic devices, such as CD players and DVD players, see 2640\n- manufacture of television monitors and displays, see 2640\n- manufacture of video game consoles, see 2640\n- manufacture of blank optical and magnetic media for use with computers or other devices, see 2680",
	},
	{
		id: '46c744e8-4954-4427-91cc-9e8d2c2fe697',
		name: '2814:Manufacture of bearings, gears, gearing and driving elements',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2814 Description: Manufacture of bearings, gears, gearing and driving elements Explanatory Note Inclusion: This class includes:\n- manufacture of ball and roller bearings and parts thereof\n- manufacture of mechanical power transmission equipment:\n* transmission shafts and cranks: camshafts, crankshafts, cranks etc.\n* bearing housings and plain shaft bearings\n- manufacture of gears, gearing and gear boxes and other speed changers\n- manufacture of clutches and shaft couplings\n- manufacture of flywheels and pulleys\n- manufacture of articulated link chain\n- manufacture of power transmission chain Explanatory Note Exclusion: This class excludes:\n- manufacture of other chain, see 2599\n- manufacture of (electromagnetic) clutches, see 2930\n- manufacture of sub-assemblies of power transmission equipment identifiable as parts of vehicles or aircraft, see divisions 29 and 30',
	},
	{
		id: '3b041d5d-951d-40b1-b7eb-d1623ebac06e',
		name: '774:Leasing of intellectual property and similar products, except copyrighted wo',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 774 Description: Leasing of intellectual property and similar products, except copyrighted works Explanatory Note Inclusion: See class 7740. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'd6f1f6fc-727e-48cb-935b-cb1d617a62d3',
		name: '50:Water transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 50 Description: Water transport Explanatory Note Inclusion: This division includes the transport of passengers or freight over water, whether scheduled or not. Also included are the operation of towing or pushing boats, excursion, cruise or sightseeing boats, ferries, water taxis etc. Although the location is an indicator for the separation between sea and inland water transport, the deciding factor is the type of vessel used. All transport on sea-going vessels is classified in group 501, while transport using other vessels is classified in group 502.\n\nThis division excludes restaurant and bar activities on board ships (see class 5610, 5630), if carried out by separate units. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2d755330-1103-4ca7-8120-35ce12f54485',
		name: 'O:Public administration and defence; compulsory social security',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: O Description: Public administration and defence; compulsory social security Explanatory Note Inclusion: This section includes activities of a governmental nature, normally carried out by the public administration. This includes the enactment and judicial interpretation of laws and their pursuant regulation, as well as the administration of programmes based on them, legislative activities, taxation, national defence, public order and safety, immigration services, foreign affairs and the administration of government programmes. This section also includes compulsory social security activities.\n\nThe legal or institutional status is not, in itself, the determining factor for an activity to belong in this section, rather than the activity being of a nature specified in the previous paragraph. This means that activities classified elsewhere in ISIC do not fall under this section, even if carried out by public entities. For example, administration of the school system (i.e. regulations, checks, curricula) falls under this section, but teaching itself does not (see section P), and a prison or military hospital is classified to health (see section Q). Similarly, some activities described in this section may be carried out by non-government units. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ce93fb33-0e84-4450-a7cb-f08b020c80a5',
		name: '7729:Renting and leasing of other personal and household goods',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7729 Description: Renting and leasing of other personal and household goods Explanatory Note Inclusion: This class includes:\n- renting of all kinds of household or personal goods, to households or industries (except recreational and sports equipment):\n* textiles, wearing apparel and footwear\n* furniture, pottery and glass, kitchen and tableware, electrical appliances and house wares\n* jewellery, musical instruments, scenery and costumes\n* books, journals and magazines\n* machinery and equipment used by amateurs or as a hobby e.g. tools for home repairs\n* flowers and plants\n* electronic equipment for household use Explanatory Note Exclusion: This class excludes:\n- renting of cars, trucks, trailers and recreational vehicles without driver, see 7710\n- renting of recreational and sports goods, see 7721\n- renting of video tapes and disks, see 7722\n- renting of motorcycles and caravans without driver, see 7730\n- renting of office furniture, see 7730\n- provision of linen, work uniforms and related items by laundries, see 9601',
	},
	{
		id: '4dd23cd4-ac1d-4153-b022-20fd7d6b6ebe',
		name: '649:Other financial service activities, except insurance and pension funding act',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 649 Description: Other financial service activities, except insurance and pension funding activities Explanatory Note Inclusion: This group includes financial service activities other than those conducted by monetary institutions. Explanatory Note Exclusion: This group excludes:\n- insurance and pension funding activities, see division 65',
	},
	{
		id: '79ab5073-0f6c-46ac-89e9-cfffa6032087',
		name: '0899:Other mining and quarrying n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0899 Description: Other mining and quarrying n.e.c. Explanatory Note Inclusion: This class includes:\n- mining and quarrying of various minerals and materials:\n* abrasive materials, asbestos, siliceous fossil meals, natural graphite, steatite (talc), feldspar etc.\n* natural asphalt, asphaltites and asphaltic rock; natural solid bitumen\n* gemstones, quartz, mica etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7ee91718-1d43-41ce-91a4-9042d8a4bd3b',
		name: '491:Transport via railways',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 491 Description: Transport via railways Explanatory Note Inclusion: This group includes rail transportation of passengers and/or freight using railroad rolling stock on mainline networks, usually spread over an extensive geographic area. Freight rail transport over short-line freight railroads is included here. Explanatory Note Exclusion: This group excludes:\n- urban and suburban passenger land transport, see 4921\n- related activities such as switching and shunting, see 5221 \n- operation of railroad infrastructure, see 5221',
	},
	{
		id: 'bc758112-937f-4d4a-abec-b45e436bbd31',
		name: '653:Pension funding',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 653 Description: Pension funding Explanatory Note Inclusion: See class 6530. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a925b028-02a4-4458-8c99-a66d62721565',
		name: '4722:Retail sale of beverages in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4722 Description: Retail sale of beverages in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of beverages (not for consumption on the premises):\n* alcoholic beverages\n* non-alcoholic beverages Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4962398f-2fce-4db4-9361-9ae94cfecf49',
		name: '141:Manufacture of wearing apparel, except fur apparel',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 141 Description: Manufacture of wearing apparel, except fur apparel Explanatory Note Inclusion: See class 1410. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '34d31206-cfc9-4290-bdf7-40beaa32fb12',
		name: '742:Photographic activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 742 Description: Photographic activities Explanatory Note Inclusion: See class 7420. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '27499c25-05ef-4f63-93c4-c1734a52c64e',
		name: '0129:Growing of other perennial crops',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0129 Description: Growing of other perennial crops Explanatory Note Inclusion: This class includes:\n- growing of rubber trees\n- growing of Christmas trees\n- growing of trees for extraction of sap\n- growing of vegetable materials of a kind used primarily for plaiting Explanatory Note Exclusion: This class excludes:\n- gathering of tree sap or rubber-like gums in the wild, see 0230',
	},
	{
		id: '4dba99a9-7e69-44cc-8018-9ad44f70b6d7',
		name: '261:Manufacture of electronic components and boards',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 261 Description: Manufacture of electronic components and boards Explanatory Note Inclusion: See class 2610. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '04a2ed78-435a-49bb-a36e-1c9a142b7f75',
		name: '1074:Manufacture of macaroni, noodles, couscous and similar farinaceous products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1074 Description: Manufacture of macaroni, noodles, couscous and similar farinaceous products Explanatory Note Inclusion: This class includes:\n- manufacture of pastas such as macaroni and noodles, whether or not cooked or stuffed\n- manufacture of couscous\n- manufacture of canned or frozen pasta products Explanatory Note Exclusion: This class excludes:\n- manufacture of prepared couscous dishes, see 1075\n- manufacture of soup containing pasta, see 1079',
	},
	{
		id: 'd3bae466-522c-46e7-9429-a361fbdf8dda',
		name: '9329:Other amusement and recreation activities n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9329 Description: Other amusement and recreation activities n.e.c. Explanatory Note Inclusion: This class includes:\n- activities of recreation parks, beaches, including renting of facilities such as bathhouses, lockers, chairs etc.\n- operation of recreational transport facilities, e.g. marinas\n- operation of ski hills\n- renting of leisure and pleasure equipment as an integral part of recreational facilities\n- operation of fairs and shows of a recreational nature\n- operation of discotheques and dance floors\n- operation (exploitation) of coin-operated games\n- other amusement and recreation activities (except amusement parks and theme parks) not elsewhere classified\n\nThis class also includes:\n- activities of producers or entrepreneurs of live events other than arts or sports events, with or without facilities Explanatory Note Exclusion: This class excludes:\n- fishing cruises, see 5011, 5021\n- provision of space and facilities for short stay by visitors in recreational parks and forests and campgrounds, see 5520\n- beverage serving activities of discotheques, see 5630\n- trailer parks, campgrounds, recreational camps, hunting and fishing camps, campsites and campgrounds, see 5520\n- separate renting of leisure and pleasure equipment, see 7721\n- operation (exploitation) of coin-operated gambling machines, see 9200\n- activities of amusement parks and theme parks, see 9321',
	},
	{
		id: '564e3808-d0d5-440e-a799-6c9bf13b8791',
		name: '6010:Radio broadcasting',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6010 Description: Radio broadcasting Explanatory Note Inclusion: This class includes:\n- broadcasting audio signals through radio broadcasting studios and facilities for the transmission of aural programming to the public, to affiliates or to subscribers\n\nThis class also includes:\n- activities of radio networks, i.e. assembling and transmitting aural programming to the affiliates or subscribers via over-the-air broadcasts, cable or satellite\n- radio broadcasting activities over the Internet (Internet radio stations)\n- data broadcasting integrated with radio broadcasting Explanatory Note Exclusion: This class excludes:\n- production of taped radio programming, see 5920',
	},
	{
		id: '569a6632-913e-425c-b3d9-dd43e39628c7',
		name: '4761:Retail sale of books, newspapers and stationary in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4761 Description: Retail sale of books, newspapers and stationary in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of books of all kinds\n- retail sale of newspapers and stationery\n\nThis class also includes:\n- retail sale of office supplies such as pens, pencils, paper etc. Explanatory Note Exclusion: This class excludes:\n- retail sale of second-hand or antique books, see 4774',
	},
	{
		id: '43b62fac-91ce-469d-9a89-823686ed1c24',
		name: '273:Manufacture of wiring and wiring devices',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 273 Description: Manufacture of wiring and wiring devices Explanatory Note Inclusion: This group includes the manufacture of current-carrying wiring devices and non current-carrying wiring devices for wiring electrical circuits regardless of material. This group also includes the insulating of wire and the manufacture of fiber optic cables. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '50551742-2521-4c30-8b8c-9dd460790cfb',
		name: '0149:Raising of other animals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0149 Description: Raising of other animals Explanatory Note Inclusion: This class includes:\n- raising and breeding of semi-domesticated or other live animals:\n* ostriches and emus\n* other birds (except poultry)\n* insects\n* rabbits and other fur animals\n- production of fur skins, reptile or bird skins from ranching operation\n- operation of worm farms, land mollusc farms, snail farms etc.\n- raising of silk worms, production of silk worm cocoons\n- bee-keeping and production of honey and beeswax\n- raising and breeding of pet animals (except fish):\n* cats and dogs\n* birds, such as parakeets etc.\n* hamsters etc.\n- raising of diverse animals Explanatory Note Exclusion: This class excludes:\n- production of hides and skins originating from hunting and trapping, see 0170\n- operation of frog farms, crocodile farms, marine worm farms, see 0321, 0322\n- operation of fish farms, see 0321, 0322\n- training of pet animals, see 9609',
	},
	{
		id: 'a7ffabe6-a6b9-4f72-a8a7-bafaa219406f',
		name: '0144:Raising of sheep and goats',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0144 Description: Raising of sheep and goats Explanatory Note Inclusion: This class includes:\n- raising and breeding of sheep and goats\n- production of raw sheep or goat milk\n- production of raw wool Explanatory Note Exclusion: This class excludes:\n- sheep shearing on a fee or contract basis, see 0162\n- production of pulled wool, see 1010\n- processing of milk, see 1050',
	},
	{
		id: '8d4f4273-9dc7-449b-a116-9e10259070ea',
		name: '0910:Support activities for petroleum and natural gas extraction',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0910 Description: Support activities for petroleum and natural gas extraction Explanatory Note Inclusion: This class includes:\n- oil and gas extraction service activities provided on a fee or contract basis:\n* exploration services in connection with petroleum or gas extraction, e.g. traditional prospecting methods, such as making geological observations at prospective sites\n* directional drilling and redrilling; "spudding in"; derrick erection in situ, repairing and dismantling; cementing oil and gas well casings; pumping of wells; plugging and abandoning wells etc.\n* liquefaction and regasification of natural gas for purpose of transport, done at the mine site\n* draining and pumping services, on a fee or contract basis\n* test drilling in connection with petroleum or gas extraction\n\nThis class also includes:\n- oil and gas field fire fighting services Explanatory Note Exclusion: This class excludes:\n- service activities performed by operators of oil or gas fields, see 0610, 0620\n- specialized repair of mining machinery, see 3312\n- liquefaction and regasification of natural gas for purpose of transport, done off the mine site, see 5221\n- geophysical, geologic and seismic surveying, see 7110',
	},
	{
		id: '4f6f1895-0eb9-4bfb-9ea4-daa03fdcd7de',
		name: 'R90-R92: Creative, arts and entertainment activities; libraries, archives, museums and other cultural activities; gambl',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Creative, arts and entertainment activities; libraries, archives, museums and other cultural activities; gambling and betting activities',
	},
	{
		id: 'e5fb89a3-2370-4a90-b8aa-0dfdcedcce10',
		name: '7490:Other professional, scientific and technical activities n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7490 Description: Other professional, scientific and technical activities n.e.c. Explanatory Note Inclusion: This class includes a great variety of service activities generally delivered to commercial clients. It includes those activities for which more advanced professional, scientific and technical skill levels are required, but does not include ongoing, routine business functions that are generally of short duration.\n\nThis class includes:\n- translation and interpretation activities\n- business brokerage activities, i.e. arranging for the purchase and sale of small and medium-sized businesses, including professional practices, but not including real estate brokerage\n- patent brokerage activities (arranging for the purchase and sale of patents)\n- appraisal activities other than for real estate and insurance (for antiques, jewellery, etc.)\n- bill auditing and freight rate information\n- activities of quantity surveyors\n- weather forecasting activities\n- security consulting\n- agronomy consulting\n- environmental consulting\n- other technical consulting\n- activities of consultants other than architecture, engineering and management consultants\n\nThis class also includes:\n- activities carried on by agents and agencies on behalf of individuals usually involving the obtaining of engagements in motion picture, theatrical production or other entertainment or sports attractions and the placement of books, plays, artworks, photographs etc., with publishers, producers etc. Explanatory Note Exclusion: This class excludes:\n- wholesale of used motor vehicles by auctioning, see 4510\n- online auction activities (retail), see 4791\n- activities of auctioning houses (retail), see 4799\n- activities of real estate brokers, see 6820\n- bookkeeping activities, see 6920\n- activities of management consultants, see 7020\n- activities of architecture and engineering consultants, see 7110\n- engineering design activities, see 7110\n- display of advertisement and other advertising design, see 7310\n- creation of stands and other display structures and sites, see 7310\n- industrial design activities, see 7410\n- activities of convention and trade show organizers, see 8230\n- activities of independent auctioneers, see 8299\n- administration of loyalty programmes, see 8299\n- consumer credit and debt counselling, see 8890\n- activities of authors of scientific and technical books, see 9000\n- activities of independent journalists, see 9000',
	},
	{
		id: 'c76ab3c5-dd30-4791-b79f-2931203890c2',
		name: '811:Combined facilities support activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 811 Description: Combined facilities support activities Explanatory Note Inclusion: See class 8110. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '34f4ced3-9cec-440e-bb2e-004da7276a47',
		name: '3012:Building of pleasure and sporting boats',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3012 Description: Building of pleasure and sporting boats Explanatory Note Inclusion: This class includes:\n- manufacture of inflatable boats and rafts\n- building of sailboats with or without auxiliary motor\n- building of motor boats\n- building of recreation-type hovercraft\n- manufacture of personal watercraft\n- manufacture of other pleasure and sporting boats:\n* canoes, kayaks, rowing boats, skiffs Explanatory Note Exclusion: This class excludes:\n- manufacture of parts of pleasure and sporting boats:\n* manufacture of sails, see 1392\n* manufacture of iron or steel anchors, see 2599\n* manufacture of marine engines, see 2811\n- manufacture of sailboards and surfboards, see 3230\n- maintenance, repair or alteration of pleasure boats, see 3315',
	},
	{
		id: '5d09b627-004e-4a60-a95c-aeb09b4e9c24',
		name: '9420:Activities of trade unions',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9420 Description: Activities of trade unions Explanatory Note Inclusion: This class includes:\n- promoting of the interests of organized labor and union employees\n\nThis class also includes:\n- activities of associations whose members are employees interested chiefly in the representation of their views concerning the salary and work situation, and in concerted action through organization\n- activities of single plant unions, of unions composed of affiliated branches and of labour organizations composed of affiliated unions on the basis of trade, region, organizational structure or other criteria Explanatory Note Exclusion: This class excludes:\n- education provided by such organizations, see division 85',
	},
	{
		id: '9629d6fc-c520-48d9-8d3b-7fc6866d8902',
		name: '712:Technical testing and analysis',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 712 Description: Technical testing and analysis Explanatory Note Inclusion: See class 7120. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0dfc7a01-6b2f-4025-ad6a-d01d8b865354',
		name: '071:Mining of iron ores',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 071 Description: Mining of iron ores Explanatory Note Inclusion: See class 0710. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '36cd730c-4485-4fe9-8efe-8850f771796d',
		name: '2394:Manufacture of cement, lime and plaster',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2394 Description: Manufacture of cement, lime and plaster Explanatory Note Inclusion: This class includes:\n- manufacture of clinkers and hydraulic cements, including Portland, aluminous cement, slag cement and superphosphate cements\n- manufacture of quicklime, slaked lime and hydraulic lime\n- manufacture of plasters of calcined gypsum or calcined sulphate\n- manufacture of calcined dolomite Explanatory Note Exclusion: This class excludes:\n- manufacture of refractory mortars, concrete etc., see 2391\n- manufacture of articles of cement, see 2395\n- manufacture of articles of plaster, see 2395\n- manufacture of ready-mixed and dry-mix concrete and mortars, see 2395\n- manufacture of cements used in dentistry, see 3250',
	},
	{
		id: 'fe5d3e16-bcff-408b-a21d-3da859a0e9da',
		name: 'U:Activities of extraterritorial organizations and bodies',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: U Description: Activities of extraterritorial organizations and bodies Explanatory Note Inclusion: See class 9900. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b300b042-f44d-4cf4-bf29-a87e98b9a9f8',
		name: '2817:Manufacture of office machinery and equipment (except computers and periphe',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2817 Description: Manufacture of office machinery and equipment (except computers and peripheral equipment) Explanatory Note Inclusion: This class includes:\n- manufacture of calculating machines\n- manufacture of adding machines, cash registers\n- manufacture of calculators, electronic or not\n- manufacture of postage meters, mail handling machines (envelope stuffing, sealing and addressing machinery; opening, sorting, scanning), collating machinery\n- manufacture of typewriters\n- manufacture of stenography machines\n- manufacture of office-type binding equipment (i.e. plastic or tape binding) \n- manufacture of cheque writing machines\n- manufacture of coin counting and coin wrapping machinery\n- manufacture of pencil sharpeners\n- manufacture of staplers and staple removers\n- manufacture of voting machines\n- manufacture of tape dispensers\n- manufacture of hole punches\n- manufacture of cash registers, mechanically operated\n- manufacture of photocopy machines\n- manufacture of toner cartridges\n- manufacture of blackboards; white boards and marker boards\n- manufacture of dictating machines Explanatory Note Exclusion: This class excludes:\n- manufacture of computers and peripheral equipment, see 2620',
	},
	{
		id: 'bc6e631e-572c-453c-8a3f-d093d07f9c59',
		name: '88:Social work activities without accommodation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 88 Description: Social work activities without accommodation Explanatory Note Inclusion: This division includes the provision of a variety of social assistance services directly to clients. The activities in this division do not include accommodation services, except on a temporary basis. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'dd1f6683-5021-4e6c-891c-ae38246f3726',
		name: '4753:Retail sale of carpets, rugs, wall and floor coverings in specialized store',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4753 Description: Retail sale of carpets, rugs, wall and floor coverings in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of carpets and rugs\n- retail sale of curtains and net curtains\n- retail sale of wallpaper and floor coverings Explanatory Note Exclusion: This class excludes:\n- retail sale of cork floor tiles, see 4752',
	},
	{
		id: 'e4d9ce5e-5dd1-4583-a479-bf7c4c0dbbc9',
		name: '462:Wholesale of agricultural raw materials and live animals',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 462 Description: Wholesale of agricultural raw materials and live animals Explanatory Note Inclusion: See class 4620. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0ff50f3b-b5a1-43f5-a115-39312ad16741',
		name: '9491:Activities of religious organizations',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9491 Description: Activities of religious organizations Explanatory Note Inclusion: This class includes:\n- activities of religious organizations or individuals providing services directly to worshippers in churches, mosques, temples, synagogues or other places\n- activities of organizations providing monastery and convent services\n- religious retreat activities\n\nThis class also includes:\n- religious funeral service activities Explanatory Note Exclusion: This class excludes:\n- education provided by such organizations, see division 85\n- health activities by such organizations, see division 86\n- social work activities by such organizations, see divisions 87 and 88',
	},
	{
		id: '67b56bd9-02a4-4be7-9854-2b180b699233',
		name: '293:Manufacture of parts and accessories for motor vehicles',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 293 Description: Manufacture of parts and accessories for motor vehicles Explanatory Note Inclusion: See class 2930. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e29aa215-fad0-41ef-a46b-3b3b8e5033aa',
		name: '7010:Activities of head offices',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7010 Description: Activities of head offices Explanatory Note Inclusion: This class includes the overseeing and managing of other units of the company or enterprise; undertaking the strategic or organizational planning and decision making role of the company or enterprise; exercising operational control and manage the day-to-day operations of their related units.\n\nThis class includes activities of:\n- head offices\n- centralized administrative offices\n- corporate offices\n- district and regional offices\n- subsidiary management offices Explanatory Note Exclusion: This class excludes:\n- activities of holding companies, not engaged in managing, see 6420',
	},
	{
		id: '28305118-aba0-4325-b85d-110de6b49fa0',
		name: '103:Processing and preserving of fruit and vegetables',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 103 Description: Processing and preserving of fruit and vegetables Explanatory Note Inclusion: See class 1030. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '2873e3cc-e919-4f07-81b7-fb2539009a64',
		name: '231:Manufacture of glass and glass products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 231 Description: Manufacture of glass and glass products Explanatory Note Inclusion: See class 2310. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'a8667ea6-f874-411d-b707-63c782bcbbd9',
		name: '39:Remediation activities and other waste management services',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 39 Description: Remediation activities and other waste management services Explanatory Note Inclusion: This division includes the provision of remediation services, i.e. the cleanup of contaminated buildings and sites, soil, surface or ground water. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'f7053287-151e-4cca-896d-ab07b1846f52',
		name: '74:Other professional, scientific and technical activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 74 Description: Other professional, scientific and technical activities Explanatory Note Inclusion: This division includes the provision of professional scientific and technical services (except legal and accounting activities; architecture and engineering activities; technical testing and analysis; management and management consultancy activities; research and development and advertising activities). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '912923fe-ef8d-4e3d-bce8-117eae700802',
		name: '329:Other manufacturing n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 329 Description: Other manufacturing n.e.c. Explanatory Note Inclusion: See class 3290. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4a2b883c-01ab-4861-94fc-f79358933922',
		name: '07:Mining of metal ores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 07 Description: Mining of metal ores Explanatory Note Inclusion: This division includes mining for metallic minerals (ores), performed through underground or open-cast extraction, seabed mining etc. Also included are ore dressing and beneficiating operations, such as crushing, grinding, washing, drying, sintering, calcining or leaching ore, gravity separation or flotation operations.\n\nThis division excludes manufacturing activities such as the roasting of iron pyrites (see class 2011), the production of aluminium oxide (see class 2420) and the operation of blast furnaces (see classes 2410 and 2420). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '42562776-7db8-4542-b4e3-4dd1572dd626',
		name: '652:Reinsurance',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 652 Description: Reinsurance Explanatory Note Inclusion: See class 6520. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'fe27780e-0132-4317-af9e-6d9fd16115f2',
		name: 'M74-M75: Other professional, scientific and technical activities; veterinary activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Other professional, scientific and technical activities; veterinary activities',
	},
	{
		id: 'c60adb17-6cef-4eb6-adff-dbfc327539c4',
		name: '9700:Activities of households as employers of domestic personnel',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 9700 Description: Activities of households as employers of domestic personnel Explanatory Note Inclusion: This class includes:\n- activities of households as employers of domestic personnel such as maids, cooks, waiters, valets, butlers, laundresses, gardeners, gatekeepers, stable-lads, chauffeurs, caretakers, governesses, babysitters, tutors, secretaries etc. \nIt allows the domestic personnel employed to state the activity of their employer in censuses or studies, even though the employer is an individual. The product produced by this activity is consumed by the employing household. Explanatory Note Exclusion: This class excludes:\n- provision of services such as cooking, gardening etc. by independent service providers (companies or individuals), see ISIC class according to type of service',
	},
	{
		id: '0361351a-6b01-4f21-b29b-c752c20bc21f',
		name: '4921:Urban and suburban passenger land transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4921 Description: Urban and suburban passenger land transport Explanatory Note Inclusion: This class includes:\n- land transport of passengers by urban or suburban transport systems. This may include different modes of land transport, such as by motorbus, tramway, streetcar, trolley bus, underground and elevated railways etc. The transport is carried out on scheduled routes normally following a fixed time schedule, entailing the picking up and setting down of passengers at normally fixed stops.\n\nThis class also includes:\n- town-to-airport or town-to-station lines\n- operation of funicular railways, aerial cableways etc. if part of urban or suburban transit systems Explanatory Note Exclusion: This class excludes:\n- passenger transport by inter-urban railways, see 4911',
	},
	{
		id: '5290a3b7-75a9-472f-acaf-2e981f4ac871',
		name: '102:Processing and preserving of fish, crustaceans and molluscs',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 102 Description: Processing and preserving of fish, crustaceans and molluscs Explanatory Note Inclusion: See class 1020. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '4a6b84a4-5918-4632-ad78-e2c0c69c0274',
		name: '012:Growing of perennial crops',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 012 Description: Growing of perennial crops Explanatory Note Inclusion: This group includes the growing of perennial crops, i.e. plants that lasts for more than two growing seasons, either dying back after each season or growing continuously. Included is the growing of these plants for the purpose of seed production. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'ceed9651-fbc7-4bb7-b9d9-30fc21b13c0a',
		name: '4762:Retail sale of music and video recordings in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4762 Description: Retail sale of music and video recordings in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of musical records, audio tapes, compact discs and cassettes\n- retail sale of video tapes and DVDs\n\nThis class also includes:\n- retail sale of blank tapes and discs Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '9786ca55-8c2e-4ec3-8805-cc086c403b48',
		name: '7740:Leasing of intellectual property and similar products, except copyrighted w',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7740 Description: Leasing of intellectual property and similar products, except copyrighted works Explanatory Note Inclusion: This class includes the activities of allowing others to use intellectual property products and similar products for which a royalty payment or licensing fee is paid to the owner of the product (i.e. the asset holder). The leasing of these products can take various forms, such as permission for reproduction, use in subsequent processes or products, operating businesses under a franchise etc. The current owners may or may not have created these products.\n\nThis class includes:\n- leasing of intellectual property products (except copyrighted works, such as books or software)\n- receiving royalties or licensing fees for the use of:\n* patented entities\n* trademarks or service marks\n* brand names\n* mineral exploration and evaluation\n* franchise agreements Explanatory Note Exclusion: This class excludes:\n- acquisition of rights and publishing, see divisions 58 and 59\n- producing, reproducing and distributing copyrighted works (books, software, film), see divisions 58 and 59\n- leasing of real estate, see group 681\n- leasing of tangible products (assets), see groups 771, 772, 773\n- renting of video tapes and disks, see 7722\n- renting of books, see 7729',
	},
	{
		id: 'a746916c-f942-41e2-a267-f7b3a83d9bd8',
		name: '2512:Manufacture of tanks, reservoirs and containers of metal',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2512 Description: Manufacture of tanks, reservoirs and containers of metal Explanatory Note Inclusion: This class includes:\n- manufacture of reservoirs, tanks and similar containers of metal, of types normally installed as fixtures for storage or manufacturing use\n- manufacture of metal containers for compressed or liquefied gas\n- manufacture of central heating boilers and radiators Explanatory Note Exclusion: This class excludes:\n- manufacture of metal casks, drums, cans, pails, boxes etc. of a kind normally used for carrying and packing of goods, see 2599\n- manufacture of transport containers, see 2920\n- manufacture of tanks (armored military vehicles), see 3040',
	},
	{
		id: '7b17f77d-aac1-4f94-b0de-b593cd2dd40e',
		name: '476:Retail sale of cultural and recreation goods in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 476 Description: Retail sale of cultural and recreation goods in specialized stores Explanatory Note Inclusion: This group includes the retail sale in specialized stores of cultural and recreation goods, such as books, newspapers, music and video recordings, sporting equipment, games and toys. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '36b2cb36-1598-4ecb-b324-6f8bd1c2e966',
		name: '642:Activities of holding companies',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 642 Description: Activities of holding companies Explanatory Note Inclusion: See class 6420. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '1b602da0-cd3b-4386-865e-6d6c2513de01',
		name: '6630:Fund management activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6630 Description: Fund management activities Explanatory Note Inclusion: This class includes portfolio and fund management activities on a fee or contract basis, for individuals, businesses and others.\n\nThis class includes:\n- management of pension funds\n- management of mutual funds\n- management of other investment funds Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '04d83550-7c85-44f3-916b-424730a81963',
		name: '2012:Manufacture of fertilizers and nitrogen compounds',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2012 Description: Manufacture of fertilizers and nitrogen compounds Explanatory Note Inclusion: This class includes:\n- manufacture of fertilizers:\n* straight or complex nitrogenous, phosphatic or potassic fertilizers\n* urea, crude natural phosphates and crude natural potassium salts\n- manufacture of associated nitrogen products:\n* nitric and sulphonitric acids, ammonia, ammonium chloride, ammonium carbonate, nitrites and nitrates of potassium\n\nThis class also includes:\n- manufacture of potting soil with peat as main constituent\n- manufacture of potting soil mixtures of natural soil, sand, clays and minerals Explanatory Note Exclusion: This class excludes:\n- mining of guano, see 0891\n- manufacture of agrochemical products, such as pesticides, see 2021\n- operation of compost dumps, see 3821',
	},
	{
		id: '70f648a5-85fc-4d11-a7ab-a2648b67eeac',
		name: '6120:Wireless telecommunications activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 6120 Description: Wireless telecommunications activities Explanatory Note Inclusion: This class includes:\n- operating, maintaining or providing access to facilities for the transmission of voice, data, text, sound, and video using a wireless telecommunications infrastructure\n- maintaining and operating paging as well as cellular and other wireless telecommunications networks\n\nThe transmission facilities provide omni-directional transmission via airwaves and may be based on a single technology or a combination of technologies.\n\nThis class also includes:\n- purchasing access and network capacity from owners and operators of networks and providing wireless telecommunications services (except satellite) using this capacity to businesses and households\n- provision of Internet access by the operator of the wireless infrastructure Explanatory Note Exclusion: This class excludes:\n- telecommunications resellers, see 6190',
	},
	{
		id: '31306131-ebaa-46b5-a614-34c1edcea24b',
		name: '266:Manufacture of irradiation, electromedical and electrotherapeutic equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 266 Description: Manufacture of irradiation, electromedical and electrotherapeutic equipment Explanatory Note Inclusion: See class 2660. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '04ef0f60-7b1e-423a-ab52-af011e6f64d5',
		name: '303:Manufacture of air and spacecraft and related machinery',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 303 Description: Manufacture of air and spacecraft and related machinery Explanatory Note Inclusion: See class 3030. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '79a2d40b-198d-4ed2-8adb-3b6e66ada569',
		name: '69:Legal and accounting activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 69 Description: Legal and accounting activities Explanatory Note Inclusion: This division includes legal representation of one party's interest against another party, whether or not before courts or other judicial bodies by, or under supervision of, persons who are members of the bar, such as advice and representation in civil cases, advice and representation in criminal actions, advice and representation in connection with labour disputes. It also includes preparation of legal documents such as articles of incorporation, partnership agreements or similar documents in connection with company formation, patents and copyrights, preparation of deeds, wills, trusts, etc. as well as other activities of notaries public, civil law notaries, bailiffs, arbitrators, examiners and referees. It also includes accounting and bookkeeping services such as auditing of accounting records, preparing financial statements and bookkeeping. Explanatory Note Exclusion: [Empty]",
	},
	{
		id: '564c0ff1-d00e-4899-93e5-dc21e22d2051',
		name: '941:Activities of business, employers and professional membership organizations',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 941 Description: Activities of business, employers and professional membership organizations Explanatory Note Inclusion: This group includes the activities of units that promote the interests of the members of business and employers organizations. In the case of professional membership organizations, it also includes the activities of promoting the professional interests of members of the profession. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '27a07d1b-169e-4985-85ad-f660f8053c88',
		name: '1061:Manufacture of grain mill products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1061 Description: Manufacture of grain mill products Explanatory Note Inclusion: This class includes:\n- grain milling: production of flour, groats, meal or pellets of wheat, rye, oats, maize (corn) or other cereal grains\n- rice milling: production of husked, milled, polished, glazed, parboiled or converted rice; production of rice flour\n- vegetable milling: production of flour or meal of dried leguminous vegetables, of roots or tubers, or of edible nuts\n- manufacture of cereal breakfast foods\n- manufacture of flour mixes and prepared blended flour and dough for bread, cakes, biscuits or pancakes Explanatory Note Exclusion: This class excludes:\n- manufacture of potato flour and meal, see 1030\n- wet corn milling, see 1062',
	},
	{
		id: '7c55dbff-8309-468e-8c6b-f8c2e5576772',
		name: '433:Building completion and finishing',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 433 Description: Building completion and finishing Explanatory Note Inclusion: See class 4330. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'fb3058cc-84a5-4eee-92b2-3ba721dea538',
		name: '1701:Manufacture of pulp, paper and paperboard',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 1701 Description: Manufacture of pulp, paper and paperboard Explanatory Note Inclusion: This class includes:\n- manufacture of bleached, semi-bleached or unbleached paper pulp by mechanical, chemical (dissolving or non-dissolving) or semi-chemical processes\n- manufacture of cotton-linters pulp\n- removal of ink and manufacture of pulp from waste paper\n- manufacture of paper and paperboard intended for further industrial processing\n\nThis class also includes:\n- further processing of paper and paperboard:\n* coating, covering and impregnating of paper and paperboard\n* manufacture of cr\u00eaped or crinkled paper\n* manufacture of laminates and foils, if laminated with paper or paperboard\n- manufacture of handmade paper\n- manufacture of newsprint and other printing or writing paper\n- manufacture of cellulose wadding and webs of cellulose fibres\n- manufacture of carbon paper or stencil paper in rolls or large sheets Explanatory Note Exclusion: This class excludes:\n- manufacture of corrugated paper and paperboard, see 1702\n- manufacture of further-processed articles of paper, paperboard or pulp, see 1709\n- manufacture of coated or impregnated paper, where the coating or impregnant is the main ingredient, see class in which the manufacture of the coating or impregnant is classified\n- manufacture of abrasive paper, see 2399',
	},
	{
		id: 'daeb058d-2b85-4918-86d9-d95272d6edab',
		name: '0170:Hunting, trapping and related service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0170 Description: Hunting, trapping and related service activities Explanatory Note Inclusion: This class includes:\n- hunting and trapping on a commercial basis\n- taking of animals (dead or alive) for food, fur, skin, or for use in research, in zoos or as pets\n- production of fur skins, reptile or bird skins from hunting or trapping activities\n\nThis class also includes:\n- land-based catching of sea mammals such as walrus and seal Explanatory Note Exclusion: This class excludes:\n- production of fur skins, reptile or bird skins from ranching operations, see group 014\n- raising of game animals on ranching operations, see 0149\n- catching of whales, see 0311\n- production of hides and skins originating from slaughterhouses, see 1010\n- hunting for sport or recreation and related service activities, see 9319\n- service activities to promote hunting and trapping, see 9499',
	},
	{
		id: 'bc211f5f-9ce7-49d0-bafb-f9e5d33fe3c8',
		name: '70:Activities of head offices; management consultancy activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 70 Description: Activities of head offices; management consultancy activities Explanatory Note Inclusion: This division includes the provision of advice and assistance to businesses and other organizations on management issues, such as strategic and organizational planning; financial planning and budgeting; marketing objectives and policies; human resource policies, practices, and planning; production scheduling; and control planning. It also includes the overseeing and managing of other units of the same company or enterprise, i.e. the activities of head offices. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '612513c7-22e7-46f5-9e30-b195e9716d2d',
		name: '8890:Other social work activities without accommodation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8890 Description: Other social work activities without accommodation Explanatory Note Inclusion: This class includes:\n- social, counselling, welfare, refugee, referral and similar services which are delivered to individuals and families in their homes or elsewhere and carried out by public or by private organizations, disaster relief organizations and national or local self-help organizations and by specialists providing counselling services:\n* welfare and guidance activities for children and adolescents\n* adoption activities, activities for the prevention of cruelty to children and others\n* household budget counselling, marriage and family guidance, credit and debt counselling services\n* community and neighbourhood activities\n* activities for disaster victims, refugees, immigrants etc., including temporary or extended shelter for them\n* vocational rehabilitation and habilitation activities for unemployed persons provided that the education component is limited\n* eligibility determination in connection with welfare aid, rent supplements or food stamps\n* child day-care activities, including for handicapped children\n* day facilities for the homeless and other socially weak groups\n* charitable activities like fund-raising or other supporting activities aimed at social work Explanatory Note Exclusion: This class excludes:\n- funding and administration of compulsory social security programmes, see 8430\n- activities similar to those described in this class, but including accommodation, see 8790',
	},
	{
		id: '83a403fc-8d48-4b16-a96d-d19e11153d7a',
		name: '873:Residential care activities for the elderly and disabled',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 873 Description: Residential care activities for the elderly and disabled Explanatory Note Inclusion: See class 8730. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0b79fb79-6fb7-40db-8f13-c56ab0cdfe01',
		name: 'E37-E39: Sewerage; waste collection, treatment and disposal activities; materials recovery; remediation activities and o',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Sewerage; waste collection, treatment and disposal activities; materials recovery; remediation activities and other waste management services',
	},
	{
		id: '62198a0d-8f39-4f9c-b05b-7ec29a70c047',
		name: '3220:Manufacture of musical instruments',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3220 Description: Manufacture of musical instruments Explanatory Note Inclusion: This class includes:\n- manufacture of stringed instruments\n- manufacture of keyboard stringed instruments, including automatic pianos\n- manufacture of keyboard pipe organs, including harmoniums and similar keyboard instruments with free metal reeds\n- manufacture of accordions and similar instruments, including mouth organs\n- manufacture of wind instruments\n- manufacture of percussion musical instruments\n- manufacture of musical instruments, the sound of which is produced electronically\n- manufacture of musical boxes, fairground organs, calliopes etc.\n- manufacture of instrument parts and accessories:\n* metronomes, tuning forks, pitch pipes, cards, discs and rolls for automatic mechanical instruments etc.\n\nThis class also includes:\n- manufacture of whistles, call horns and other mouth-blown sound signalling instruments Explanatory Note Exclusion: This class excludes:\n- reproduction of pre-recorded sound and video tapes and discs, see 1820\n- manufacture of microphones, amplifiers, loudspeakers, headphones and similar components, see 2640\n- manufacture of record players, tape recorders and the like, see 2640\n- manufacture of toy musical instruments, see 3240\n- restoring of organs and other historic musical instruments, see 3319\n- publishing of pre-recorded sound and video tapes and discs, see 5920\n- piano tuning, see 9529',
	},
	{
		id: 'be669ecf-bf0b-4b68-86f2-e8c5228aedc0',
		name: '663:Fund management activities',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 663 Description: Fund management activities Explanatory Note Inclusion: See class 6630. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '14363e31-908b-4e16-a794-638f2affef72',
		name: '2220:Manufacture of plastics products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 2220 Description: Manufacture of plastics products Explanatory Note Inclusion: This class includes the processing of new or spent (i.e. recycled) plastics resins into intermediate or final products, using such processes as compression molding, extrusion molding, injection molding, blow molding and casting. For most of these, the production process is such that a wide variety of products can be made.\n\nThis class includes:\n- manufacture of semi-manufactures of plastic products:\n* plastic plates, sheets, blocks, film, foil, strip etc. (whether self-adhesive or not)\n- manufacture of finished plastic products:\n* plastic tubes, pipes and hoses; hose and pipe fittings\n- manufacture of plastic articles for the packing of goods:\n* plastic bags, sacks, containers, boxes, cases, carboys, bottles etc.\n- manufacture of builders' plastics ware:\n* plastic doors, windows, frames, shutters, blinds, skirting boards\n* tanks, reservoirs\n* plastic floor, wall or ceiling coverings in rolls or in the form of tiles etc.\n* plastic sanitary ware, such as:\n** plastic baths, shower baths, washbasins, lavatory pans, flushing cisterns etc.\n- manufacture of plastic tableware, kitchenware and toilet articles\n- cellophane film or sheet\n- manufacture of resilient floor coverings, such as vinyl, linoleum etc.\n- manufacture of artificial stone (e.g. cultured marble)\n- manufacture of plastic signs (non-electrical)\n- manufacture of diverse plastic products:\n* plastic headgear, insulating fittings, parts of lighting fittings, office or school supplies, articles of apparel (if only sealed together, not sewn), fittings for furniture, statuettes, transmission and conveyer belts, self-adhesive tapes of plastic, plastic wall paper, plastic shoe lasts, plastic cigar and cigarette holders, combs, plastics hair curlers, plastics novelties, etc. Explanatory Note Exclusion: This class excludes:\n- manufacture of plastic luggage, see 1512\n- manufacture of plastic footwear, see 1520\n- manufacture of plastics in primary forms, see 2013\n- manufacture of articles of synthetic or natural rubber, see group 221\n- manufacture of plastic non current-carrying wiring devices (e.g. junction boxes, face plates), see 2733\n- manufacture of plastic furniture, see 3100\n- manufacture of mattresses of uncovered cellular plastic, see 3100\n- manufacture of plastic sports requisites, see 3230\n- manufacture of plastic games and toys, see 3240\n- manufacture of plastic medical and dental appliances, see 3250\n- manufacture of plastic ophthalmic goods, see 3250\n- manufacture of plastics hard hats and other personal safety equipment of plastics, see 3290",
	},
	{
		id: '4bb326bb-e3df-4d71-b77c-f9a2f7e55536',
		name: '4930:Transport via pipeline',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4930 Description: Transport via pipeline Explanatory Note Inclusion: This class includes:\n- transport of gases, liquids, water, slurry and other commodities via pipelines\n\nThis class also includes:\n- operation of pump stations Explanatory Note Exclusion: This class excludes:\n- distribution of natural or manufactured gas, water or steam, see 3520, 3530, 3600\n- transport of water, liquids etc. by trucks, see 4923',
	},
	{
		id: '4e63fb2c-9afd-4427-8893-1d89e2b36c57',
		name: '14:Manufacture of wearing apparel',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 14 Description: Manufacture of wearing apparel Explanatory Note Inclusion: This division includes all tailoring (ready-to-wear or made-to-measure), in all materials (e.g. leather, fabric, knitted and crocheted fabrics etc.), of all items of clothing (e.g. outerwear, underwear for men, women or children; work, city or casual clothing etc.) and accessories. There is no distinction made between clothing for adults and clothing for children, or between modern and traditional clothing. Division 14 also includes the fur industry (fur skins and wearing apparel). Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '04b32bf5-e18b-4304-b640-f7aecc1a0402',
		name: '5590:Other accommodation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5590 Description: Other accommodation Explanatory Note Inclusion: This class includes the provision of temporary or longer-term accommodation in single or shared rooms or dormitories for students, migrant (seasonal) workers and other individuals. \n\nThis class includes accommodation provided by:\n- student residences\n- school dormitories\n- workers hostels \n- rooming and boarding houses\n- railway sleeping cars Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '82f89e30-edd1-4a3f-b656-b7a4cca6cbab',
		name: '4730:Retail sale of automotive fuel in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4730 Description: Retail sale of automotive fuel in specialized stores Explanatory Note Inclusion: This class includes:\n- retail sale of fuel for motor vehicles and motorcycles\n\nThis class also includes:\n- retail sale of lubricating products and cooling products for motor vehicles Explanatory Note Exclusion: This class excludes:\n- wholesale of fuels, see 4661\n- retail sale of fuel in combination with food, beverages etc., with food and beverage sales dominating, see 4711\n- retail sale of liquefied petroleum gas for cooking or heating, see 4773',
	},
	{
		id: '857f3fe4-537b-42d0-977c-80231d5aa7b1',
		name: '192:Manufacture of refined petroleum products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 192 Description: Manufacture of refined petroleum products Explanatory Note Inclusion: See class 1920. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7dba5292-095b-4796-880a-849b982e1ab8',
		name: '7722:Renting of video tapes and disks',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7722 Description: Renting of video tapes and disks Explanatory Note Inclusion: This class includes:\n- renting of video tapes, records, CDs, DVDs etc. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'b8c60340-64dd-47db-b053-5113f560e093',
		name: '3314:Repair of electrical equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 3314 Description: Repair of electrical equipment Explanatory Note Inclusion: This class includes the repair and maintenance of goods of division 27, except those in class 2750 (domestic appliances).\n\nThis class includes:\n- repair and maintenance of power, distribution, and specialty transformers\n- repair and maintenance of electric motors, generators, and motor generator sets\n- repair and maintenance of switchgear and switchboard apparatus\n- repair and maintenance of relays and industrial controls\n- repair and maintenance of primary and storage batteries\n- repair and maintenance of electric lighting equipment\n- repair and maintenance of current-carrying wiring devices and non current-carrying wiring devices for wiring electrical circuits Explanatory Note Exclusion: This class excludes:\n- repair and maintenance of computers and peripheral computer equipment, see 9511\n- repair and maintenance of telecommunications equipment, see 9512\n- repair and maintenance of consumer electronics, see 9521\n- repair of watches and clocks, see 9529',
	},
	{
		id: '01529f20-5044-423d-b7d5-65d8336f256a',
		name: '181:Printing and service activities related to printing',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 181 Description: Printing and service activities related to printing Explanatory Note Inclusion: This group includes printing of products, such as newspapers, books, periodicals, business forms, greeting cards, and other materials, and associated support activities, such as bookbinding, plate-making services, and data imaging. Printing can be done using various techniques and on different materials. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '41ee62ec-9af4-4711-949a-13139c8d08bc',
		name: '431:Demolition and site preparation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 431 Description: Demolition and site preparation Explanatory Note Inclusion: This group includes activities of preparing a site for subsequent construction activities, including the removal of previously existing structures. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'fba1f850-7c8b-408f-9979-c67fb7509587',
		name: '472:Retail sale of food, beverages and tobacco in specialized stores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 472 Description: Retail sale of food, beverages and tobacco in specialized stores Explanatory Note Inclusion: This group includes retail sale in stores specialized in selling food, beverage or tobacco products. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'e557936d-e982-4782-a31a-5d27935e9a73',
		name: 'R:Arts, entertainment and recreation',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: R Description: Arts, entertainment and recreation Explanatory Note Inclusion: This section includes a wide range of activities to meet varied cultural, entertainment and recreational interests of the general public, including live performances, operation of museum sites, gambling, sports and recreation activities. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '958bfbfd-5154-4d88-82de-eb8ed4af10fa',
		name: '7911:Travel agency activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7911 Description: Travel agency activities Explanatory Note Inclusion: This class includes:\n- activities of agencies primarily engaged in selling travel, tour, transportation and accommodation services to the general public and commercial clients Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '5c9e1c2d-a3de-4c71-98d6-d4598fd44846',
		name: '5021:Inland passenger water transport',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 5021 Description: Inland passenger water transport Explanatory Note Inclusion: This class includes:\n- transport of passenger via rivers, canals, lakes and other inland waterways, including inside harbours and ports\n\nThis class also includes:\n- renting of pleasure boats with crew for inland water transport Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '84075720-566f-4df9-bbfc-a2498d8ba1e4',
		name: '781:Activities of employment placement agencies',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 781 Description: Activities of employment placement agencies Explanatory Note Inclusion: See class 7810. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '28f738cc-bb73-48f8-b633-f83fb9bc5ddc',
		name: '2011:Manufacture of basic chemicals',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2011 Description: Manufacture of basic chemicals Explanatory Note Inclusion: This class includes the manufacture of chemicals using basic processes, such as thermal cracking and distillation. The output of these processes are usually separate chemical elements or separate chemically defined compounds.\n\nThis class includes:\n- manufacture of liquefied or compressed inorganic industrial or medical gases:\n* elemental gases\n* liquid or compressed air\n* refrigerant gases\n* mixed industrial gases\n* inert gases such as carbon dioxide\n* isolating gases\n- manufacture of dyes and pigments from any source in basic form or as concentrate\n- manufacture of chemical elements\n- manufacture of inorganic acids except nitric acid\n- manufacture of alkalis, lyes and other inorganic bases except ammonia\n- manufacture of other inorganic compounds\n- manufacture of basic organic chemicals:\n* acyclic hydrocarbons, saturated and unsaturated\n* cyclic hydrocarbons, saturated and unsaturated\n* acyclic and cyclic alcohols\n* mono- and polycarboxylic acids, including acetic acid\n* other oxygen-function compounds, including aldehydes, ketones, quinones and dual or poly oxygen-function compounds\n* synthetic glycerol\n* nitrogen-function organic compounds, including amines\n* fermentation of sugarcane, corn or similar to produce alcohol and esters\n* other organic compounds, including wood distillation products (e.g. charcoal) etc.\n- manufacture of distilled water\n- manufacture of synthetic aromatic products\n- roasting of iron pyrites\n\nThis class also includes:\n- manufacture of products of a kind used as fluorescent brightening agents or as luminophores\n- enrichment of uranium and thorium ores and production of fuel elements for nuclear reactors Explanatory Note Exclusion: This class excludes:\n- extraction of methane, ethane, butane or propane, see 0620\n- manufacture of fuel gases such as ethane, butane or propane in a petroleum refinery, see 1920\n- manufacture of nitrogenous fertilizers and nitrogen compounds, see 2012\n- manufacture of ammonia, see 2012\n- manufacture of ammonium chloride, see 2012\n- manufacture of nitrites and nitrates of potassium, see 2012\n- manufacture of ammonium carbonates, see 2012\n- manufacture of plastics in primary forms, see 2013\n- manufacture of synthetic rubber in primary forms, see 2013\n- manufacture of prepared dyes and pigments, see 2022\n- manufacture of crude glycerol, see 2023\n- manufacture of natural essential oils, see 2029\n- manufacture of aromatic distilled waters, see 2029\n- manufacture of salicylic and O-acetylsalicylic acids, see 2100',
	},
	{
		id: 'b7cd11f0-85e7-4077-8461-c4f7c5b4fafd',
		name: '8710:Residential nursing care facilities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 8710 Description: Residential nursing care facilities Explanatory Note Inclusion: This class includes:\n- activities of:\n* homes for the elderly with nursing care\n* convalescent homes\n* rest homes with nursing care\n* nursing care facilities\n* nursing homes Explanatory Note Exclusion: This class excludes:\n- in-home services provided by health care professionals, see division 86\n- activities of homes for the elderly without or with minimal nursing care, see 8730\n- social work activities with accommodation, such as orphanages, children's boarding homes and hostels, temporary homeless shelters, see 8790",
	},
	{
		id: '7ff9653c-90de-4cd0-a030-91ff2cdf117f',
		name: '36:Water collection, treatment and supply',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 36 Description: Water collection, treatment and supply Explanatory Note Inclusion: This division includes the collection, treatment and distribution of water for domestic and industrial needs. Collection of water from various sources, as well as distribution by various means is included. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0d5ae8b2-286c-4ec9-a1a7-8049feb7be87',
		name: '221:Manufacture of rubber products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 221 Description: Manufacture of rubber products Explanatory Note Inclusion: This group includes the manufacture of rubber products. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'bc4e5583-d4fe-4cc9-9185-0186681deb2a',
		name: '12:Manufacture of tobacco products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 12 Description: Manufacture of tobacco products Explanatory Note Inclusion: This division includes the processing of an agricultural product, tobacco, into a form suitable for final consumption. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '3165acc1-d5a5-47b1-983a-b4e074f876c5',
		name: '0128:Growing of spices, aromatic, drug and pharmaceutical crops',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0128 Description: Growing of spices, aromatic, drug and pharmaceutical crops Explanatory Note Inclusion: This class includes:\n- growing of perennial and non-perennial spices and aromatic crops:\n* pepper (piper spp.)\n* chilies and peppers (capsicum spp.)\n* nutmeg, mace and cardamoms\n* anise, badian and fennel\n* cinnamon (canella)\n* cloves\n* ginger\n* vanilla\n* hops\n* other spices and aromatic crops\n- growing of drug and narcotic crops\n- growing of plants used primarily in perfumery, in pharmacy or for insecticidal, fungicidal or similar purposes Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '30524e0b-861f-4de5-a40c-f14f9b44cecf',
		name: '8020:Security systems service activities',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8020 Description: Security systems service activities Explanatory Note Inclusion: This class includes:\n- monitoring or remote monitoring of electronic security alarm systems, such as burglar and fire alarms, including their maintenance\n- installing, repairing, rebuilding, and adjusting mechanical or electronic locking devices, safes and security vaults\n\nThe units carrying out these activities may also engage in selling such security systems, mechanical or electronic locking devices, safes and security vaults. Explanatory Note Exclusion: This class excludes:\n- installation of security systems, such as burglar and fire alarms, without later monitoring, see 4321\n- selling security systems, mechanical or electronic locking devices, safes and security vaults, without monitoring, installation or maintenance services, see 4759\n- security consultants, see 7490\n- public order and safety activities, see 8423\n- providing key duplication services, see 9529',
	},
	{
		id: '60f10f38-2b11-45e1-8542-fdfeacad871b',
		name: '222:Manufacture of plastics products',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 222 Description: Manufacture of plastics products Explanatory Note Inclusion: See class 2220. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '6c8f6194-1f50-4b0b-b41a-96ef42119333',
		name: '370:Sewerage',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 370 Description: Sewerage Explanatory Note Inclusion: See class 3700. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: 'cb4c8a08-54e8-4797-a900-2d4469ea30c9',
		name: '21:Manufacture of basic pharmaceutical products and pharmaceutical preparations',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 21 Description: Manufacture of basic pharmaceutical products and pharmaceutical preparations Explanatory Note Inclusion: This division includes the manufacture of basic pharmaceutical products and pharmaceutical preparations. This includes also the manufacture of medicinal chemical and botanical products. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '7be48458-dbf3-480f-b722-d1eee0645e8b',
		name: '8522:Technical and vocational secondary education',
		system: 'ISIC rev.4 ecoinvent',
		description:
			"Code: 8522 Description: Technical and vocational secondary education Explanatory Note Inclusion: This class includes education typically emphasizing subject-matter specialization and instruction in both theoretical background and practical skills generally associated with present or prospective employment. The aim of a programme can vary from preparation for a general field of employment to a very specific job. Instruction may be provided in diverse settings, such as the unit's or client's training facilities, educational institutions, the workplace, or the home, and through correspondence, television, Internet, or other means.\n\nThis class includes:\n- technical and vocational education below the level of higher education as defined in 853\n\nThis class also includes:\n- instruction for tourist guides\n- instruction for chefs, hoteliers and restaurateurs\n- special education for handicapped students at this level\n- cosmetology and barber schools\n- computer repair training\n- driving schools for occupational drivers e.g. of trucks, buses, coaches Explanatory Note Exclusion: This class excludes:\n- technical and vocational education at post-secondary and university levels, see 8530\n- adult education as defined in group 854\n- performing art instruction for recreation, hobby and self-development purposes, see 8542\n- automobile driving schools not intended for occupational drivers, see 8549\n- job training forming part of social work activities without accommodation, see 8810, 8890",
	},
	{
		id: '0056f8cd-2208-4dac-b695-691b0a04f92a',
		name: '711:Architectural and engineering activities and related technical consultancy',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 711 Description: Architectural and engineering activities and related technical consultancy Explanatory Note Inclusion: See class 7110. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '91510128-add1-4b25-9037-6845107dfeba',
		name: '332:Installation of industrial machinery and equipment',
		system: 'ISIC rev.4 ecoinvent',
		description: 'Code: 332 Description: Installation of industrial machinery and equipment Explanatory Note Inclusion: See class 3320. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '0da1a325-c407-436d-b72c-4d5ae6218576',
		name: '829:Business support service activities n.e.c.',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 829 Description: Business support service activities n.e.c. Explanatory Note Inclusion: This group includes the activities of collection agencies, credit bureaus and all support activities typically provided to businesses not elsewhere classified. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '962142c3-6a32-40a7-adc3-87c8cdc4e7ff',
		name: '0321:Marine aquaculture',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 0321 Description: Marine aquaculture Explanatory Note Inclusion: This class includes:\n- fish farming in sea water including farming of marine ornamental fish\n- production of bivalve spat (oyster mussel etc.), lobsterlings, shrimp post-larvae, fish fry and fingerlings\n- growing of laver and other edible seaweeds\n- culture of crustaceans, bivalves, other molluscs and other aquatic animals in sea water\n\nThis class also includes:\n- aquaculture activities in brackish waters\n- aquaculture activities in salt water filled tanks or reservoirs\n- operation of fish hatcheries (marine)\n- operation of marine worm farms Explanatory Note Exclusion: This class excludes:\n- frog farming, see 0322\n- operation of sport fishing preserves, see 9319',
	},
	{
		id: '4675952f-e2f8-44bf-8259-672b59dd86c3',
		name: 'N80-N82: Security and investigation activities; services to buildings and landscape activities; office administrative, o',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Security and investigation activities; services to buildings and landscape activities; office administrative, office support and other business support activities',
	},
	{
		id: '7cf03a13-4bc1-4f20-a507-b395d2c4e549',
		name: '7310:Advertising',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 7310 Description: Advertising Explanatory Note Inclusion: This class includes the provision of a full range of advertising services (i.e. through in-house capabilities or subcontracting), including advice, creative services, production of advertising material, media planning and buying.\n\nThis class includes:\n- creation and realization of advertising campaigns:\n* creating and placing advertising in newspapers, periodicals, radio, television, the Internet and other media\n* creating and placing of outdoor advertising, e.g. billboards, panels, bulletins and frames, window dressing, showroom design, car and bus carding etc.\n* media representation, i.e. sale of time and space for various media soliciting advertising\n* aerial advertising\n* distribution or delivery of advertising material or samples\n* provision of advertising space on billboards etc.\n* creation of stands and other display structures and sites\n- conducting marketing campaigns and other advertising services aimed at attracting and retaining customers:\n* promotion of products\n* point-of-sale marketing\n* direct mail advertising\n* marketing consulting Explanatory Note Exclusion: This class excludes:\n- publishing of advertising material, see 5819\n- production of commercial messages for radio, television and film, see 5911\n- public-relations activities, see 7020\n- market research, see 7320\n- graphic design activities, see 7410\n- advertising photography, see 7420\n- convention and trade show organizers, see 8230\n- mailing activities, see 8219',
	},
	{
		id: 'be9e05e7-9cb9-4db1-92fa-1f5a7b00d884',
		name: '4662:Wholesale of metals and metal ores',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 4662 Description: Wholesale of metals and metal ores Explanatory Note Inclusion: This class includes:\n- wholesale of ferrous and non-ferrous metal ores\n- wholesale of ferrous and non-ferrous metals in primary forms\n- wholesale of ferrous and non-ferrous semi-finished metal products n.e.c.\n- wholesale of gold and other precious metals Explanatory Note Exclusion: This class excludes:\n- wholesale of metal scrap, see 4669',
	},
	{
		id: '3bc82d25-1544-464c-aeb6-48996a7a8455',
		name: '17:Manufacture of paper and paper products',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 17 Description: Manufacture of paper and paper products Explanatory Note Inclusion: This division includes the manufacture of pulp, paper and converted paper products. The manufacture of these products is grouped together because they constitute a series of vertically connected processes. More than one activity is often carried out in a single unit. There are essentially three activities: The manufacture of pulp involves separating the cellulose fibers from other impurities in wood or used paper. The manufacture of paper involves matting these fibers into a sheet. Converted paper products are made from paper and other materials by various cutting and shaping techniques, including coating and laminating activities. The paper articles may be printed (e.g. wallpaper, gift wrap etc.), as long as the printing of information is not the main purpose.\nThe production of pulp, paper and paperboard in bulk is included in class 1701, while the remaining classes include the production of further-processed paper and paper products. Explanatory Note Exclusion: [Empty]',
	},
	{
		id: '33344314-6d8a-49f1-b0c0-d552918b69f1',
		name: '8421:Foreign affairs',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 8421 Description: Foreign affairs Explanatory Note Inclusion: This class includes:\n- administration and operation of the ministry of foreign affairs and diplomatic and consular missions stationed abroad or at offices of international organizations\n- administration, operation and support for information and cultural services intended for distribution beyond national boundaries\n- aid to foreign countries, whether or not routed through international organizations\n- provision of military aid to foreign countries\n- management of foreign trade, international financial and foreign technical affairs Explanatory Note Exclusion: This class excludes:\n- international disaster or conflict refugee services, see 8890',
	},
	{
		id: 'af350670-f4bc-4b99-a1be-c4710646270c',
		name: '2790:Manufacture of other electrical equipment',
		system: 'ISIC rev.4 ecoinvent',
		description:
			'Code: 2790 Description: Manufacture of other electrical equipment Explanatory Note Inclusion: This class includes the manufacture of miscellaneous electrical equipment other than motors, generators and transformers, batteries and accumulators, wires and wiring devices, lighting equipment or domestic appliances.\n\nThis class includes:\n- manufacture of battery chargers, solid-state\n- manufacture of door opening and closing devices, electrical\n- manufacture of electric bells\n- manufacture of ultrasonic cleaning machines (except laboratory and dental)\n- manufacture of tanning beds\n- manufacture of solid state inverters, rectifying apparatus, fuel cells, regulated and unregulated power supplies\n- manufacture of uninterruptible power supplies (UPS)\n- manufacture of surge suppressors (except for distribution level voltage)\n- manufacture of appliance cords, extension cords, and other electrical cord sets with insulated wire and connectors\n- manufacture of carbon and graphite electrodes, contacts, and other electrical carbon and graphite products \n- manufacture of particle accelerators\n- manufacture of electrical capacitors, resistors, condensers and similar components\n- manufacture of electromagnets\n- manufacture of sirens\n- manufacture of electronic scoreboards\n- manufacture of electrical signs\n- manufacture of electrical signalling equipment such as traffic lights and pedestrian signalling equipment\n- manufacture of electrical insulators (except glass or porcelain)\n- manufacture of electrical welding and soldering equipment, including hand-held soldering irons Explanatory Note Exclusion: This class excludes:\n- manufacture of non-electrical signs, see class according to material (plastic signs 2220, metal signs 2599)\n- manufacture of porcelain electrical insulators, see 2393\n- manufacture of carbon and graphite fibers and products (except electrodes and electrical applications), see 2399\n- manufacture of electronic component-type rectifiers, voltage regulating integrated circuits, power converting integrated circuits, electronic capacitors, electronic resistors and similar devices, see 2610\n- manufacture of transformers, motors, generators, switchgear, relays and industrial controls, see 2710\n- manufacture of batteries, see 2720\n- manufacture of communication and energy wire, current-carrying and non current-carrying wiring devices, see 2733\n- manufacture of lighting equipment, see 2740\n- manufacture of household-type appliances, see 2750\n- manufacture of non-electrical welding and soldering equipment, see 2819\n- manufacture of motor vehicle electrical equipment, such as generators, alternators, spark plugs, ignition wiring harnesses, power window and door systems, voltage regulators, see 2930\n- manufacture of mechanical and electromechanical signalling, safety and traffic control equipment for railways, tramways, inland waterways, roads, parking facilities, airfields, see 3020',
	},
];
export async function seedClassifications() {
	await prisma.$connect();

	console.log(`Seeding EcoInvent ISIC rev.4 Classifications...`);

	let count = 0;

	for (const classification of classifications) {
		const result = await prisma.ecoinvent_classifications.upsert({
			where: {
				id: classification.id,
			},
			update: {
				...classification,
			},
			create: {
				...classification,
			},
		});

		count++;
		console.log(`🌱 seeded (${count} of ${classifications.length}) Classification: ${classification.name} 🌱`, result);
	}

	console.log(`${count} Scopes seeded!`);

	console.log('migration complete!');

	await prisma.$disconnect();
}
