--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: phrases; Type: TABLE; Schema: public; Owner: vli
--

CREATE TABLE public.phrases (
    phrase_id integer NOT NULL,
    chinese_translation character varying(500) NOT NULL,
    english_translation text NOT NULL,
    theme_id integer,
    complexity_rating integer,
    root_question_id integer
);


ALTER TABLE public.phrases OWNER TO vli;

--
-- Name: phrases_phrase_id_seq; Type: SEQUENCE; Schema: public; Owner: vli
--

CREATE SEQUENCE public.phrases_phrase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phrases_phrase_id_seq OWNER TO vli;

--
-- Name: phrases_phrase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vli
--

ALTER SEQUENCE public.phrases_phrase_id_seq OWNED BY public.phrases.phrase_id;


--
-- Name: themes; Type: TABLE; Schema: public; Owner: vli
--

CREATE TABLE public.themes (
    theme_id integer NOT NULL,
    theme_name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.themes OWNER TO vli;

--
-- Name: themes_theme_id_seq; Type: SEQUENCE; Schema: public; Owner: vli
--

CREATE SEQUENCE public.themes_theme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.themes_theme_id_seq OWNER TO vli;

--
-- Name: themes_theme_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vli
--

ALTER SEQUENCE public.themes_theme_id_seq OWNED BY public.themes.theme_id;


--
-- Name: phrases phrase_id; Type: DEFAULT; Schema: public; Owner: vli
--

ALTER TABLE ONLY public.phrases ALTER COLUMN phrase_id SET DEFAULT nextval('public.phrases_phrase_id_seq'::regclass);


--
-- Name: themes theme_id; Type: DEFAULT; Schema: public; Owner: vli
--

ALTER TABLE ONLY public.themes ALTER COLUMN theme_id SET DEFAULT nextval('public.themes_theme_id_seq'::regclass);


--
-- Data for Name: phrases; Type: TABLE DATA; Schema: public; Owner: vli
--

COPY public.phrases (phrase_id, chinese_translation, english_translation, theme_id, complexity_rating, root_question_id) FROM stdin;
1	你好！好耐冇見，你最近好唔好呀？	Hello! Long time no see	1	1	\N
2	我好好，多謝。	I’m good, thank you.	1	1	1
3	最近點呀？	How have you been recently?	1	1	\N
4	都幾忙，不過一切都好。	Quite busy, but everything’s fine.	1	1	3
5	最近有冇同朋友出街呀？	Have you been hanging out with friends lately?	1	3	\N
6	有呀，上個禮拜去咗飲茶，好開心呀！	Yeah, we went for dim sum last week. It was great!	1	3	5
7	聽講你最近轉咗工，係咪呀？	I heard you recently changed jobs, is that true?	1	4	\N
8	係呀，我而家喺銀行做文職，幾好呀！	Yes, I’m now working in a bank as a clerk. It’s pretty good!\t	1	2	7
9	唔係呀，我仲喺舊公司做緊，但係最近忙咗好多。	No, I’m still at my old job, but things have gotten a lot busier recently.\t	1	2	7
10	係呀，我轉咗去一間細啲嘅公司，壓力冇咁大。	Yes, I moved to a smaller company, and the work pressure is much less now.	1	2	7
11	係呀，我而家做自由工作者，可以有多啲時間陪屋企人。\t	Yes, I’m freelancing now, so I have more time to spend with my family.	1	2	7
12	你最近有冇乜特別嘅計劃呀?	Do you have any special plans coming up? 	1	2	\N
13	有呀，計劃下個月去旅行，想去日本睇櫻花！	Yes, I’m planning to go on a trip next month to see the cherry blossoms in Japan!	1	3	12
14	冇乜特別嘅計劃，不過想多啲時間陪家人。	No special plans, but I want to spend more time with my family.	1	2	12
15	其實有呀，打算參加一個烹飪班，學多啲新菜式。	Actually, yes, I plan to join a cooking class to learn some new recipes.	1	3	12
16	最近有冇做過咩新嘅嘢？	Have you done anything new lately?	1	2	\N
17	今排工作忙唔忙？	Have you been busy with work lately?	1	2	\N
18	你嘅周末通常點樣過？	How do you usually spend your weekends?	1	2	\N
19	最近有冇試過咩好食嘅餐廳？	Have you tried any good restaurants recently?	1	2	\N
20	你有冇興趣學新嘢？	Are you interested in learning something new?	1	3	\N
21	有呀，上個星期去咗攀岩，真係好有挑戰性！	Yes, I went rock climbing last week, it was really challenging!	1	3	16
22	最近開始學打高爾夫球，唔係好容易，但都幾開心。	I recently started learning golf. It's not easy, but it's quite fun.	1	3	16
23	其實冇咩新嘢，日常生活都幾平淡。	Not really, everyday life has been pretty ordinary.	1	2	16
24	嗯，都幾忙，不過都試住平衡返生活同工作。	Yeah, it's been quite busy, but I try to balance work and life.	1	3	17
25	最近唔係咁忙，終於可以放鬆少少。	It hasn't been as busy recently, so I can finally relax a bit.	1	2	17
26	工作好忙，成日都加班，有時都覺得攰。	Work has been busy, always overtime, sometimes I feel exhausted.	1	3	17
27	我通常會同朋友出去旅行，或者在家睇電影。	I usually go on trips with friends or watch movies at home.	1	2	18
28	周末我會去公園跑步，保持身體健康。	On weekends, I go running in the park to stay fit.	1	3	18
29	我多數會同家人食飯或者休息。	I mostly have meals with my family or just rest.	1	2	18
30	最近去咗一間新開嘅意大利餐廳，意粉好正！	I recently went to a newly opened Italian restaurant, and the pasta was excellent!	1	2	19
31	係呀，我試過一間新嘅日式餐廳，食咗好好嘅刺身。	Yes, I tried a new Japanese restaurant and had some really good sashimi.	1	2	19
32	最近冇試過新餐廳，但都係有時去返啲舊嘅地方食。	I haven't tried any new restaurants lately, but I sometimes go back to old places.	1	2	19
33	我一直想學烹飪，但未有機會，可能下個月會報個班。	I've always wanted to learn cooking, but haven't had the chance. I might sign up for a class next month.	1	3	20
34	有呀，最近開始學鋼琴，想試下新嘢。	Yes, I've started learning the piano recently, just trying something new.	1	3	20
35	唔係咁有興趣，現在都滿足於現有嘅興趣。	Not really interested, I'm happy with my current hobbies.	1	2	20
36	你最近有冇去銀行辦理過咩事？	Have you been to the bank recently for any transactions?	2	2	\N
37	你有冇開過銀行戶口？	Have you ever opened a bank account?	2	2	\N
38	你係咪有啲唔明白銀行手續，想我幫你解釋？	Do you need help understanding any banking procedures?	2	3	\N
39	你會唔會擔心網上銀行嘅安全性？	Are you concerned about the security of online banking?	2	3	\N
40	你有冇試過用手機應用程式辦理銀行業務？	Have you ever used a mobile app for banking services?	2	2	\N
41	有呀，上個星期去咗銀行，辦理咗一筆存款。	Yes, I went to the bank last week to make a deposit.	2	2	36
42	唔係最近，但我有時會去銀行辦理轉賬。	Not recently, but I occasionally go to the bank to make transfers.	2	2	36
43	我最近都幾少去銀行，通常都係用網上銀行。	I haven't been to the bank much recently; I usually use online banking.	2	2	36
44	有呀，幾年前開咗個普通儲蓄戶口。	Yes, I opened a regular savings account a few years ago.	2	2	37
45	我最近開咗個聯名戶口，想同家人一起理財。	I recently opened a joint account to manage finances with my family.	2	3	37
46	冇，我都未試過開戶口，不過有計劃想開個定期戶口。	No, I've never opened an account, but I'm planning to open a fixed deposit account.	2	2	37
47	唔該，你可以解釋下如何做銀行轉賬嗎？	Thanks, could you explain how to make a bank transfer?	2	3	38
48	係呀，我唔係好明白如何開立信用卡。	Yes, I don't quite understand how to apply for a credit card.	2	3	38
49	我有時會唔清楚銀行的手續費，唔知應該點處理。	Sometimes I’m unclear about bank service fees and how to handle them.	2	3	38
50	會有少少擔心，不過我通常會設定雙重身份驗證。	I am a bit concerned, but I usually enable two-factor authentication.	2	3	39
51	係呀，我唔太信任網上銀行，寧願去分行處理。	Yes, I'm not very comfortable with online banking; I prefer to handle things in person.	2	3	39
52	我覺得網上銀行方便，但係要小心唔好俾人騙到。	I find online banking convenient, but I have to be careful not to get scammed.	2	3	39
53	係呀，我最近試過用手機應用程式做過存款。	Yes, I recently used a mobile app to make a deposit.	2	2	40
54	有，但有時會擔心唔知啲應用程式嘅安全性點樣。	Yes, but sometimes I'm concerned about the security of these apps.	2	3	40
55	我未試過，但聽講有好多銀行都推出咗方便嘅應用程式。	I haven’t tried it yet, but I’ve heard that many banks have launched convenient apps.	2	2	40
56	你最近有冇參加過技術面試？	Have you participated in any technical interviews recently?	3	3	\N
57	你而家做緊咩工作？	What kind of work are you doing right now?	3	2	\N
58	你覺得做軟件工程師最重要嘅技能係咩？	What do you think is the most important skill for a software engineer?	3	2	\N
59	你會唔會參加開發者社群活動？	Do you participate in developer community events?	3	2	\N
60	你最鍾意用邊種編程語言做開發？	Which programming language do you prefer to use for development?	3	2	\N
61	有呀，上個月參加咗一場面試，不過最後唔係我嘅選擇。	Yes, I participated in an interview last month, but it wasn’t the right fit for me.	3	3	56
62	最近冇，但我計劃幾個月後再試。	Not recently, but I'm planning to try again in a few months.	3	2	56
63	我有試過多次面試，但通常會問好多算法問題。	I've had several interviews, and they usually ask a lot of algorithm questions.	3	3	56
64	我而家係做一啲後端開發工作，專注於建設API同資料庫優化。	I'm currently doing backend development work, focusing on building APIs and database optimization.	3	2	57
65	我係做初創公司嘅前端工程師，負責開發用戶界面。	I'm a frontend engineer at a startup, working on developing user interfaces.	3	2	57
66	最近轉咗做產品經理，主要處理團隊協作同需求分析。	I recently switched to being a product manager, mainly handling team coordination and requirement analysis.	3	3	57
67	我覺得最重要嘅技能係解決問題嘅能力，因為工程上經常會遇到新挑戰。	I think the most important skill is problem-solving because engineers often face new challenges.	3	2	58
68	設計模式同軟件架構知識都好重要，可以幫助維持代碼質量。	Knowledge of design patterns and software architecture is also very important for maintaining code quality.	3	3	58
69	溝通同協作能力都係軟件工程師唔可以忽略嘅技能，特別係開發團隊嘅工作。	Communication and teamwork are essential skills for software engineers, especially in a team environment.	3	2	58
70	係呀，我會去一啲開發者聚會，識識新朋友同埋學新嘢。	Yes, I go to developer meetups to network and learn new things.	3	2	59
71	冇經常參加，但有時會參加線上研討會同技術講座。	I don’t attend often, but I sometimes join online webinars and tech talks.	3	2	59
72	我有參加一啲編程挑戰同黑客松，係一個好機會可以同其他工程師交流。	I participate in coding challenges and hackathons; it's a great way to connect with other engineers.	3	3	59
73	我鍾意用Python做開發，因為佢嘅語法簡單同埋有好多庫可以用。	I prefer using Python for development because of its simple syntax and rich ecosystem.	3	2	60
74	JavaScript都係我常用嘅語言，尤其係做網頁開發時。	JavaScript is another language I use often, especially for web development.	3	2	60
75	最近我開始學Go語言，佢對於高效能應用好有幫助。	I've recently started learning Go, which is great for high-performance applications.	3	3	60
76	你最近有冇留意過有關新技術嘅新聞？	Have you been paying attention to the news about new technologies lately?	4	2	\N
77	你對最近嘅人工智能發展有咩睇法？	What do you think about the recent developments in artificial intelligence?	4	3	\N
78	你知唔知道最近有冇新嘅智能手機推出？	Do you know if any new smartphones have been launched recently?	4	2	\N
79	你覺得科技公司喺環保方面做得如何？	How do you think tech companies are doing in terms of environmental efforts?	4	3	\N
80	最近有冇咩技術創新吸引咗你嘅注意？	Has any technological innovation caught your attention recently?	4	2	\N
81	有呀，我最近睇咗篇有關量子電腦發展嘅文章。	Yes, I recently read an article about the development of quantum computers.	4	2	76
82	我會定期關注科技新聞，尤其係關於新嘅產品同技術。	I regularly follow tech news, especially about new products and technologies.	4	2	76
83	唔係，最近都冇留意到咩特別嘅新聞。	No, I haven’t noticed any special news lately.	4	1	76
84	我覺得人工智能嘅進步真係好快，不過都有啲擔心佢嘅影響。	I think the progress in AI is really fast, but I’m also concerned about its implications.	4	3	77
85	最近嘅人工智能技術可以做好多以前唔可能做嘅事，真係令人驚訝。	Recent AI technology can do many things that were impossible before, it's really impressive.	4	3	77
86	我對人工智能嘅發展都幾有興趣，尤其係機器學習同深度學習。	I’m quite interested in the development of AI, especially machine learning and deep learning.	4	3	77
87	我知道最近有部新手機推出咗，佢嘅相機功能好先進。	I know there has been a new smartphone launched recently, and its camera features are very advanced.	4	2	78
88	有，最近有部新款手機推出咗，內部設計同性能都好唔錯。	Yes, a new smartphone has been released recently, and its design and performance are quite good.	4	2	78
89	唔係，最近唔係好關心有冇新手機推出。	No, I haven’t been paying much attention to new smartphone releases recently.	4	1	78
90	我覺得有啲科技公司已經開始採取更多環保措施，但都仲有好多需要改善嘅地方。	I think some tech companies are starting to take more environmental measures, but there’s still a lot that needs improvement.	4	3	79
91	最近有啲公司會使用可再生能源同減少碳排放，係好事。	Some companies are using renewable energy and reducing carbon emissions, which is a good thing.	4	3	79
92	我唔係好清楚科技公司喺環保方面嘅具體做法。	I’m not very clear about the specific actions tech companies are taking in terms of environmental efforts.	4	2	79
93	有呀，我最近有留意到無人駕駛技術嘅新進展。	Yes, I’ve recently noticed new developments in autonomous driving technology.	4	2	80
94	係，最近有啲新嘅智能家居設備，係唔錯嘅創新。	Yes, there have been some new smart home devices, which are interesting innovations.	4	2	80
95	最近冇咩特別嘅技術創新吸引到我。	There haven’t been any particular innovations that have caught my attention lately.	4	1	80
96	你最近有冇買咩新嘢？	Have you bought anything new recently?	5	2	\N
97	你會唔會係市集或街市買嘢？	Do you ever shop at markets or street vendors?	5	2	\N
98	你買嘢嘅時候會唔會砍價？	Do you bargain when you shop?	5	3	\N
99	最近有冇咩好嘅折扣或特價產品？	Have you come across any good discounts or sale items recently?	5	2	\N
100	你最鍾意邊間商店買嘢？	Which store do you like to shop at the most?	5	2	\N
101	有呀，我最近買咗部新手機。	Yes, I recently bought a new phone.	5	2	96
102	唔係，最近冇買咩新嘢。	No, I haven’t bought anything new recently.	5	1	96
103	我最近買咗啲衣服同鞋。	I recently bought some clothes and shoes.	5	2	96
104	有時會，我覺得市集有好多平靚嘢。	Sometimes, I do. I think markets have a lot of affordable and good items.	5	2	97
105	唔係，我比較鍾意去大型商場。	No, I prefer shopping at big malls.	5	2	97
106	我會，尤其係買食品同本地產品。	Yes, especially when buying food and local products.	5	2	97
107	會嘅，特別係去夜市或者小店。	Yes, especially when I go to night markets or small shops.	5	3	98
108	唔會，我覺得唔太好意思。	No, I don’t; I find it a bit awkward.	5	2	98
109	有時會，視乎情況同嘢嘅價錢。	Sometimes, I do, depending on the situation and the price.	5	3	98
110	係呀，最近我買咗啲打折嘅電子產品。	Yes, I’ve found some discounted electronic products recently.	5	2	99
111	唔係，最近冇見到咩特別嘅優惠。	No, I haven’t come across any special offers lately.	5	1	99
112	有呀，我買咗啲特價嘅衣服，幾抵玩。	Yes, I bought some clothes on sale. They were quite a good deal.	5	2	99
113	我最鍾意去大型百貨公司買嘢，選擇多。	I like shopping at big department stores the most; they have a lot of options.	5	2	100
114	我鍾意去專門店，因為產品質量比較有保障。	I prefer specialized stores because the quality of products is more reliable.	5	3	100
115	我唔係有特別鍾意嘅商店，視乎需要而決定。	I don’t have a particular store I like; it depends on what I need.	5	2	100
116	你今晚打算食咩？	What do you plan to eat tonight?	6	1	\N
117	你最鍾意嘅餐廳係邊間？	What is your favorite restaurant?	6	2	\N
118	你鍾意食咩菜式？	What type of cuisine do you like?	6	1	\N
119	你平時食飯會唔會試新嘢？	Do you try new dishes when you eat out?	6	2	\N
120	你有冇啲唔鍾意食嘅食材？	Are there any ingredients you don't like?	6	3	\N
121	我打算今晚食個意大利餐，試下新開嘅餐廳。	I plan to have Italian food tonight, trying out a new restaurant.	6	2	116
122	唔知，可能食家裡做嘅飯。	I’m not sure; maybe just eat something homemade.	6	1	116
123	我今晚會食中式炒菜，簡單又好味。	I’m going to have stir-fried Chinese dishes tonight; simple and delicious.	6	2	116
124	我最鍾意嘅餐廳係嗰間有自助餐嘅，選擇多又好食。	My favorite restaurant is the one with a buffet; there are a lot of choices and the food is good.	6	2	117
125	我鍾意去嗰間日本餐廳，佢哋嘅壽司好新鮮。	I like going to that Japanese restaurant; their sushi is very fresh.	6	3	117
126	我唔係有一間特別鍾意嘅餐廳，視乎心情而定。	I don’t have a particular favorite restaurant; it depends on my mood.	6	2	117
127	我最鍾意食意大利菜同日式菜。	I like Italian and Japanese cuisines the most.	6	1	118
128	我鍾意食本地菜，特別係中式。	I like local food, especially Chinese cuisine.	6	1	118
129	我喜歡食西餐，尤其係扒房嘅牛扒。	I enjoy Western food, especially steak from steakhouse restaurants.	6	2	118
130	會嘅，我鍾意試下唔同嘅菜式。	Yes, I do. I like trying different dishes.	6	1	119
131	唔會，我通常都係食自己熟悉嘅嘢。	No, I don’t; I usually stick to what I’m familiar with.	6	2	119
132	視乎心情，有時會試新嘢，有時就唔會。	It depends on my mood; sometimes I try new dishes, sometimes I don’t.	6	2	119
133	我唔鍾意食辣嘢，會令我唔舒服。	I don’t like spicy food; it makes me uncomfortable.	6	3	120
134	我唔食海鮮，因為過敏。	I don’t eat seafood because I’m allergic.	6	3	120
135	我唔鍾意食苦瓜，味道太苦啦。	I don’t like bitter melon; the taste is too bitter.	6	2	120
136	你最近有冇計劃旅行？	Have you planned any recent trips?	7	1	\N
137	你最鍾意嘅旅遊地點係邊？	What is your favorite travel destination?	7	2	\N
138	你會唔會自助旅行？	Do you prefer traveling independently?	7	1	\N
139	你平時選擇咩方法去旅行？	What mode of transport do you usually choose when you travel?	7	2	\N
140	你鍾意住酒店定民宿？	Do you prefer staying at hotels or homestays?	7	2	\N
141	有啊，我計劃下個月去日本旅遊。	Yes, I’m planning a trip to Japan next month.	7	2	136
142	唔係好確定，可能會去香港。	I’m not sure yet; I might go to Hong Kong.	7	1	136
143	我計劃下個星期去海邊，放鬆一下。	I’m planning to go to the beach next week to relax.	7	2	136
144	我最鍾意嘅旅遊地點係巴黎，因為好浪漫。	My favorite travel destination is Paris because it’s so romantic.	7	3	137
145	我鍾意去新加坡，因為有好多美食。	I love going to Singapore because of the great food.	7	2	137
146	我最鍾意去泰國，尤其係普吉島，風景好靚。	My favorite place is Thailand, especially Phuket; the scenery is beautiful.	7	3	137
147	會，我覺得自助旅行好自由，唔受限於團體。	Yes, I do; I find independent travel very freeing and not restricted by a group.	7	2	138
148	唔會，我比較鍾意跟團旅行，唔使自己計劃。	No, I prefer traveling with a tour group so I don’t have to plan everything myself.	7	2	138
149	視乎情況，有時會選擇自助旅行，有時會跟團。	It depends on the situation; sometimes I choose independent travel, and other times I go with a group.	7	2	138
150	我通常會搭飛機，因為方便同快捷。	I usually travel by plane because it’s convenient and fast.	7	1	139
151	我鍾意搭火車，因為可以欣賞沿途風景。	I prefer taking the train because I can enjoy the scenery along the way.	7	2	139
152	我會視乎距離，短途就搭巴士，長途就搭飛機。	It depends on the distance; for short trips, I take the bus, and for long ones, I fly.	7	2	139
153	我鍾意住酒店，因為比較方便同有設施。	I prefer staying at hotels because they are more convenient and have better facilities.	7	2	140
154	我比較鍾意住民宿，因為感覺更有本地特色。	I prefer staying at homestays because they offer more local flavor.	7	2	140
155	我會視乎情況，如果係旅遊景點附近就住酒店，否則就住民宿。	It depends on the situation; if I’m near tourist attractions, I stay at hotels, otherwise I go for a homestay.	7	2	140
156	你有冇遇到過緊急情況？	Have you ever been in an emergency situation?	8	2	\N
157	如果有意外，你會點做？	What would you do if there was an accident?	8	3	\N
158	你知唔知道緊急聯絡電話係咩？	Do you know what the emergency contact number is?	8	1	\N
159	你有冇試過向醫生解釋自己嘅病徵？	Have you ever had to explain your symptoms to a doctor?	8	2	\N
160	如果有人受傷，你會點幫助佢？	What would you do if someone got injured?	8	3	\N
161	有，曾經有一次係車禍現場，真係好驚。	Yes, once I was at the scene of a car accident, it was really scary.	8	3	156
162	係有過一次火警，但幸好冇大問題。	Yes, I’ve experienced a fire alarm once, but luckily there was no major issue.	8	2	156
163	唔係好記得，但我知道緊急情況一定要保持冷靜。	I don’t recall any specific situation, but I know it’s important to stay calm during an emergency.	8	2	156
164	我會打緊急電話，並嘗試協助傷者。	I would call emergency services and try to assist the injured person.	8	2	157
165	首先要確認安全，然後幫助受害者，最後報警。	First, make sure the area is safe, then help the victim, and finally call for help.	8	3	157
166	我會根據情況提供急救，直到專業人員到達。	I would provide first aid depending on the situation until professionals arrive.	8	3	157
167	當然，緊急時打999係最重要嘅。	Of course, calling 999 is the most important thing in an emergency.	8	1	158
168	係嘅，我知道係緊急情況要打緊急電話，係香港係打999。	Yes, I know that in an emergency, you should call the emergency number, which is 999 in Hong Kong.	8	1	158
169	我知道緊急情況應該報警或打電話求助。	I know that in an emergency, you should report it or call for help.	8	1	158
170	係呀，當我嘔吐同頭痛時，我會向醫生解釋情況。	Yes, when I was vomiting and had a headache, I explained the situation to the doctor.	8	2	159
171	我試過向醫生解釋我有嘅過敏反應，佢都幫到我。	I once explained my allergic reactions to a doctor, and they were able to help me.	8	3	159
172	有，解釋清楚病徵好重要，特別係緊急情況。	Yes, it’s important to explain your symptoms clearly, especially in an emergency.	8	2	159
173	我會嘗試止血並叫人幫手，必要時打緊急電話。	I would try to stop the bleeding and ask for help, and call emergency services if needed.	8	3	160
174	如果係小傷，我會用繃帶包紮，否則會叫救護車。	If it’s a minor injury, I would use a bandage to dress it, otherwise, I’d call for an ambulance.	8	2	160
175	我會幫佢檢查有冇重傷，並嘗試安慰佢。	I would check for serious injuries and try to comfort them.	8	3	160
176	你最近身體健康嗎？	Have you been in good health recently?	9	1	\N
177	你有冇試過去睇醫生？	Have you ever been to see a doctor?	9	2	\N
178	你通常點樣保持身體健康？	How do you usually maintain your physical health?	9	3	\N
179	你覺得壓力大嘅時候，點樣放鬆？	How do you relax when you’re stressed?	9	3	\N
180	你最近有冇唔舒服嘅感覺？	Have you been feeling unwell recently?	9	2	\N
181	我最近都幾健康，飲食同運動都做得好。	I’ve been quite healthy recently, keeping up with my diet and exercise.	9	2	176
182	有時有啲疲勞，但大體上都冇問題。	Sometimes I feel a bit tired, but overall, I’m fine.	9	2	176
183	最近有啲小感冒，但都快啲康復。	I had a slight cold recently, but I’m recovering quickly.	9	2	176
184	有，係上個禮拜因為喉嚨痛去過一次。	Yes, I went last week because of a sore throat.	9	3	177
185	係呀，我每年都會定期檢查身體。	Yes, I get regular checkups every year.	9	2	177
186	以前有試過，但最近都冇去睇過。	I have been before, but I haven’t gone recently.	9	1	177
187	我會每日做運動，例如跑步同做瑜伽。	I exercise every day, like running and doing yoga.	9	3	178
188	健康飲食同保持足夠嘅休息都好重要。	Eating healthy and getting enough rest are also important.	9	2	178
189	我會每週去健身室訓練，保持身體健康。	I go to the gym weekly for training to stay healthy.	9	3	178
190	我會做深呼吸同冥想，幫助放鬆。	I do deep breathing and meditate to help me relax.	9	2	179
191	平時會聽音樂或者睇書，幫助我減壓。	I usually listen to music or read a book to reduce stress.	9	3	179
192	同朋友聚會都係一種放鬆方式。	Meeting up with friends is also a way to relax.	9	2	179
193	唔係好舒服，最近有啲頭痛同流感症狀。	I haven’t been feeling well; I’ve had headaches and flu symptoms.	9	3	180
194	唔係好舒服，但都唔算嚴重。	I’ve been unwell, but it’s not too serious.	9	2	180
195	最近有啲肚瀉，應該係食咗唔乾淨嘅嘢。	I’ve had some diarrhea recently, probably from eating something unclean.	9	3	180
196	你最近同家人嘅關係點呀？	How have your relationships with your family been lately?	10	1	\N
197	你有冇同朋友吵架？	Have you argued with any friends recently?	10	2	\N
198	你同伴侶之間有冇咩新嘅計劃？	Do you and your partner have any new plans?	10	3	\N
199	你會點樣解決同人之間嘅矛盾？	How do you resolve conflicts with others?	10	3	\N
200	你同家人經常會做咩活動？	What activities do you often do with your family?	10	2	\N
201	最近都幾好，大家都係忙住工作，但都有時間聚埋一齊食飯。	It’s been good lately; everyone’s busy with work, but we still make time to have meals together.	10	2	196
202	有時會有啲小爭執，但都係會攤開傾。	Sometimes there are small arguments, but we always talk things through.	10	3	196
203	我哋一家人最近都幾開心，因為大家都健康。	My family has been happy lately because we’re all healthy.	10	2	196
204	係，有一次因為一啲唔重要嘅嘢發生咗爭拗，但已經和好啦。	Yes, there was an argument over something minor, but we’ve already made up.	10	3	197
205	無啦，最近同朋友相處都幾融洽。	No, I’ve been getting along well with my friends recently.	10	2	197
206	會有時有啲唔同意見，但都會好好溝通。	There are sometimes differences of opinion, but we always communicate well.	10	3	197
207	我哋計劃去旅行，想換個環境放鬆一下。	We’re planning a trip to change the environment and relax.	10	3	198
208	最近有啲咩特別嘅慶祝活動，兩個人都好期待。	We’re looking forward to celebrating something special together soon.	10	2	198
209	無特別計劃，但我哋會繼續支持對方嘅夢想。	No special plans, but we’ll continue to support each other’s dreams.	10	2	198
210	我會先聽對方講，了解佢嘅感受，然後再表達自己嘅立場。	I listen to the other person first to understand their feelings and then express my own position.	10	2	199
211	通常會冷靜一陣，然後再同對方講解問題。	Usually, I take a moment to calm down before explaining the problem to the other person.	10	3	199
212	我哋會一齊諗解決方法，唔會只係互相指責。	We try to think of a solution together rather than just blaming each other.	10	3	199
213	我哋會一齊做晚餐，或者玩遊戲。	We cook dinner together or play games.	10	2	200
214	會去郊外野餐，享受大自然。	We go on picnics in the countryside and enjoy nature.	10	3	200
215	有時會去旅行或者參加家族聚會。	Sometimes we go on trips or attend family gatherings.	10	2	200
216	你平時有咩嗜好？	What hobbies do you usually have?	11	1	\N
217	你最鍾意做咩運動？	What sport do you like to do the most?	11	2	\N
218	你有冇試過學畫畫？	Have you ever tried learning how to draw?	11	3	\N
219	你係唔係一個遊戲迷？	Are you a gamer?	11	2	\N
220	最近有冇試過啲新嘅興趣？	Have you tried any new hobbies recently?	11	3	\N
221	我鍾意旅行，攝影同埋聽音樂。	I enjoy traveling, photography, and listening to music.	11	2	216
222	平時我會讀書，或者做運動保持健康。	I usually read books or exercise to stay healthy.	11	2	216
223	我最喜歡嘅嗜好係做手工藝，特別係編織同做手工卡片。	My favorite hobby is crafting, especially knitting and making handmade cards.	11	3	216
224	我最鍾意打籃球，幾乎每個週末都會去球場。	I love playing basketball; I go to the court almost every weekend.	11	2	217
225	我喜歡跑步，跑步係我放鬆心情嘅方法。	I enjoy running; it’s my way to relax.	11	1	217
226	游泳係我最鍾意嘅運動，特別係夏天。	Swimming is my favorite sport, especially in the summer.	11	2	217
227	係，有試過畫過風景畫，不過都唔係咁有天份。	Yes, I’ve tried painting landscapes, but I’m not that talented.	11	3	218
228	我有興趣學畫畫，但最近冇時間。	I’m interested in learning how to draw, but I haven’t had time lately.	11	2	218
229	係呀，學咗一啲簡單嘅插畫，唔錯！	Yes, I’ve learned some basic illustration, and it’s going well!	11	2	218
230	係，我係一個遊戲迷，特別鍾意玩角色扮演遊戲。	Yes, I’m a gamer, and I especially like playing role-playing games.	11	3	219
231	唔係，好少玩遊戲，不過有時會同朋友玩啲簡單嘅遊戲。	No, I don’t play games much, but I sometimes play simple games with friends.	11	2	219
232	我唔係太鍾意遊戲，但我會睇直播了解下新嘅遊戲趨勢。	I’m not really into games, but I watch streams to keep up with new gaming trends.	11	2	219
233	係呀，最近學咗做陶藝，覺得好有趣。	Yes, I’ve recently started learning pottery, and it’s really fun.	11	3	220
234	最近試咗學做烘焙，效果唔錯！	I’ve recently tried baking, and it turned out well!	11	2	220
235	無，最近都冇時間試新嘅興趣，但我有計劃。	No, I haven’t had time to try any new hobbies, but I do have plans.	11	2	220
236	今天天氣點？	How’s the weather today?	12	1	\N
237	今個星期會唔會落雨？	Will it rain this week?	12	2	\N
238	你鍾意冬天定係夏天？	Do you prefer winter or summer?	12	2	\N
239	呢個季節嘅天氣點樣？	How’s the weather in this season?	12	2	\N
240	你有冇睇天氣報告？	Have you checked the weather report?	12	1	\N
241	今日天氣幾好，陽光普照，氣溫大約25度。	The weather is nice today, sunny with a temperature of around 25°C.	12	1	236
242	今日天氣唔錯，但有少少風。	The weather is good today, but there’s a bit of wind.	12	1	236
243	今天天氣唔太理想，會下雨。	The weather isn’t great today; it’s going to rain.	12	2	236
244	係，預計後日會有雷陣雨。	Yes, it’s forecasted to have thunderstorms the day after tomorrow.	12	3	237
245	無，這個星期天氣都幾乾燥，唔會有雨。	No, it’s quite dry this week and there won’t be any rain.	12	2	237
246	唔太肯定，但可能會有少少陣雨。	Not too sure, but there might be some light showers.	12	2	237
247	我鍾意夏天，因為可以攞住冰凍飲品出去玩。	I prefer summer because I can take cold drinks and go out to play.	12	2	238
248	冬天最好，因為可以著厚衫，感覺好溫暖。	I like winter best because I can wear thick clothes and feel warm.	12	2	238
249	我兩者都鍾意，視乎當時嘅心情。	I like both, depending on my mood at the time.	12	1	238
250	呢個季節天氣都幾舒服，唔太熱亦唔太冷。	The weather in this season is quite comfortable, not too hot or too cold.	12	2	239
251	今個季節比較潮濕，唔係咁適合戶外活動。	This season is relatively humid, not ideal for outdoor activities.	12	3	239
252	呢個季節天氣變化多，時晴時雨。	The weather in this season changes a lot, sunny at times and rainy at others.	12	2	239
253	係，有睇，話會有一個禮拜都係陽光普照。	Yes, I’ve checked it, and it’s forecasted to be sunny for a week.	12	2	240
254	係，啱啱睇咗，話呢個星期會比較涼。	Yes, I just checked, and it says this week will be cooler.	12	2	240
255	無，我唔太留意天氣報告，通常睇天都知天氣點。	No, I don’t really follow the weather report; I usually look outside to know the weather.	12	1	240
256	你最近有冇睇到啲唔錯嘅租盤？	Have you seen any good rental listings lately?	13	2	\N
257	你打算買樓定係租樓？	Are you planning to buy or rent a house?	13	2	\N
258	呢度附近有冇啲好嘅房屋仲售？	Are there any good houses for sale nearby?	13	2	\N
259	你覺得呢個屋企嘅租金貴唔貴？	Do you think the rent for this house is expensive?	13	2	\N
260	你平時點樣管理屋企嘅維修？	How do you usually manage household repairs?	13	3	\N
261	係，有一個啱嘅租盤，不過位置唔太理想。	Yes, there’s a suitable rental, but the location isn’t ideal.	13	2	256
262	有睇過，不過大部分都好貴。	I’ve seen some, but most of them are quite expensive.	13	2	256
263	冇，最近都冇咩合適嘅。	No, I haven’t found anything suitable recently.	13	1	256
264	我打算租樓，因為唔想一開始就承擔咁多債務。	I’m planning to rent because I don’t want to take on so much debt at the start.	13	2	257
265	我考慮買樓，但係要先儲夠首期。	I’m considering buying a house, but I need to save up for the down payment first.	13	3	257
266	我未決定，睇下情況點。	I haven’t decided yet; it depends on the situation.	13	1	257
267	有呀，但價錢都唔算平。	Yes, but the price is not cheap.	13	2	258
268	唔係好多選擇，成日都好快就賣出。	There aren’t many choices, and they sell out quickly.	13	2	258
269	有幾個，但有啲有問題，唔係咁理想。	There are a few, but some have issues and aren’t that ideal.	13	3	258
270	我覺得係貴，尤其係對於呢個區域。	I think it’s expensive, especially for this area.	13	2	259
271	唔算貴，但亦唔算平。	It’s not cheap, but it’s not too expensive either.	13	2	259
272	貴，對比其他地方嚟講都唔係咁值。	It’s expensive, and it’s not as worth it compared to other places.	13	3	259
273	我會請人幫手，因為自己唔識做。	I usually get someone to help because I don’t know how to do it myself.	13	3	260
274	我自己處理簡單嘅維修，嚴重嘅就找專業嘅人。	I handle simple repairs myself, but I call a professional for major issues.	13	2	260
275	我會定期檢查，確保冇問題。	I check regularly to make sure there are no issues.	13	2	260
276	你知唔知幾時有班車嚟？	Do you know when the next bus is coming?	14	2	\N
277	去機場最近嘅地鐵站係邊個？	Which is the nearest subway station to the airport?	14	2	\N
278	你搭的士定係自駕比較方便？	Is it more convenient to take a taxi or drive yourself?	14	2	\N
279	呢個車站有冇長途巴士？	Does this station have long-distance buses?	14	3	\N
280	如果我想去呢個地方，最好的交通方式係咩？	What’s the best way to get to this place?	14	3	\N
281	我唔係好肯定，但係你可以睇下個時刻表。	I’m not sure, but you could check the schedule.	14	2	276
282	應該幾分鐘後就會嚟啦。	It should arrive in a few minutes.	14	2	276
283	可能要等十多分鐘。	You might have to wait around ten minutes.	14	2	276
284	就係第七號站，出面有個大廣場。	It’s at station number 7; there’s a big plaza outside.	14	3	277
285	係三號線嘅終點站，你搭到之後就唔難搵到。	It’s the last stop on line 3, and it’s easy to find once you get there.	14	3	277
286	嗰個係最近嘅，不過有時都幾擠。	That’s the nearest one, but it can be quite crowded sometimes.	14	2	277
287	我覺得自駕會比較方便，尤其係你有行李嘅時候。	I think driving is more convenient, especially if you have luggage.	14	3	278
288	的士都唔錯，唔需要停車。	Taking a taxi is also good since you don’t have to park.	14	2	278
289	如果唔係高峰時段，自駕會更快。	If it’s not peak hour, driving is faster.	14	2	278
290	有，長途巴士係二號月台。	Yes, the long-distance buses are at platform 2.	14	3	279
291	係呀，有啲車會直達其他城市。	Yes, there are buses that go directly to other cities.	14	2	279
292	但係最好查清楚時刻表，因為唔係每班都會行。	But it’s best to check the schedule, as not every bus runs.	14	2	279
293	其實搭地鐵最方便，會快啲。	The subway is actually the most convenient; it’s faster.	14	3	280
294	你可以考慮搭專車或者的士，唔使擔心停車位。	You could consider taking a ride-share or taxi; no need to worry about parking.	14	2	280
295	我建議你搭巴士，因為可以欣賞沿途風景。	I suggest taking the bus as you can enjoy the scenery along the way.	14	2	280
296	你知唔知點樣申請身份證？	Do you know how to apply for an ID card?	15	3	\N
297	我需要提供咩文件嚟辦理護照？	What documents do I need to apply for a passport?	15	3	\N
298	點樣報稅係最簡單嘅方法？	What’s the easiest way to file taxes?	15	3	\N
299	你有冇試過申請工作簽證？	Have you ever applied for a work visa?	15	3	\N
300	如果我想申請一個營業執照，應該去邊度？	Where should I go to apply for a business license?	15	3	\N
301	你可以去政府網站填寫申請表，或者親自去辦公室提交。	You can fill out the application form on the government website or submit it in person at the office.	15	3	296
302	申請程序都幾簡單，記得準備好相片同埋住址證明。	The application process is quite simple; just make sure to have a photo and proof of address ready.	15	3	296
303	如果唔係好熟，建議找個人幫你填表。	If you’re not familiar with it, I suggest asking someone to help you fill out the form.	15	2	296
304	通常需要提供身份證、相片同埋一啲地址證明。	Typically, you’ll need to provide your ID, a photo, and some proof of address.	15	3	297
305	你最好先查清楚最新嘅要求，因為政策有時會改。	It’s best to check the latest requirements, as policies can change.	15	2	297
306	可以上網預約時間，或者直接去領事館辦理。	You can book an appointment online or go directly to the consulate to process it.	15	3	297
307	使用網上報稅系統係最方便嘅，唔駛排隊。	Using the online tax filing system is the most convenient; no need to wait in line.	15	3	298
308	你可以請會計師幫手，特別係報複雜嘅稅。	You can ask an accountant for help, especially for more complicated tax filings.	15	2	298
309	報稅前記住準備好所有發票同埋收據。	Make sure to have all your invoices and receipts ready before filing your taxes.	15	2	298
310	我試過一次，手續都幾繁複，要提供好多資料。	I’ve tried it once, and the process is quite complex; you need to provide a lot of information.	15	3	299
311	申請時最好有律師幫手，以免錯過咩重要文件。	It’s best to have a lawyer assist you when applying to avoid missing any important documents.	15	2	299
312	你可以上網睇下相關指引，睇清楚申請流程。	You can check the relevant guidelines online to understand the application process.	15	2	299
313	一般來講，你可以去當地的市政廳申請。	Generally, you can go to the local town hall to apply.	15	3	300
314	需要提交營業計劃書同埋其他財務文件。	You’ll need to submit a business plan and other financial documents.	15	2	300
315	記得查清楚要繳交嘅手續費同申請時間。	Make sure to check the application fee and processing time.	15	2	300
316	有哪些好的预算策略？	What are some good strategies for budgeting?	16	4	\N
317	你通常如何跟踪开支？	How do you usually track your expenses?	16	3	\N
318	你最近考虑过任何投资吗？	Have you considered any investments recently?	16	3	\N
319	你认为尽早为退休储蓄重要吗？	Do you think it's important to save for retirement early?	16	3	\N
320	你收到过的最佳财务建议是什么？	What’s the best financial advice you’ve received?	16	3	\N
321	先将开支分为需要和想要的类别。	Start by categorizing your expenses into needs and wants.	16	3	316
322	使用50/30/20规则：50%用于需求，30%用于想要，20%用于储蓄。	Use the 50/30/20 rule for budgeting: 50% needs, 30% wants, and 20% savings.	16	3	316
323	定期审查预算并根据需要进行调整。	Regularly review your budget to make adjustments as needed.	16	3	316
324	我用手机应用记录每一笔交易。	I use a mobile app to log every transaction I make.	16	3	317
325	我用电子表格记录每月的开支。	I maintain a simple spreadsheet for my monthly expenses.	16	3	317
326	我在银行账户中设置了超支提醒。	I set alerts on my bank account for when I overspend.	16	3	317
327	是的，我最近在研究共同基金。	Yes, I’ve been researching mutual funds lately.	16	3	318
328	最近没有，但我正在考虑从ETF开始。	Not recently, but I’m thinking of starting with ETFs.	16	3	318
329	我正在研究房地产投资。	I’m currently looking into real estate investments.	16	3	318
330	当然，复利随着时间推移效果更好。	Absolutely, compound interest works better over time.	16	3	319
331	这取决于你的目标，但尽早开始通常是明智的。	It depends on your goals, but starting early is usually wise.	16	3	319
332	我认为平衡当前需求和未来储蓄很重要。	I believe it’s important to balance current needs with future savings.	16	3	319
333	开支少于收入，并存下差额。	Spend less than you earn, and save the difference.	16	3	320
334	分散投资以降低风险。	Diversify your investments to minimize risk.	16	3	320
335	始终留有应急资金以备意外之需。	Always have emergency funds in case of unexpected needs.	16	3	320
\.


--
-- Data for Name: themes; Type: TABLE DATA; Schema: public; Owner: vli
--

COPY public.themes (theme_id, theme_name, description) FROM stdin;
1	Greetings	Covers common ways to say hello, introduce oneself, and start conversations in Cantonese. Includes formal and informal expressions.
2	Banking 	Deals with conversations at the bank, such as opening an account, making deposits, withdrawing money, or asking for assistance with financial services.
3	Profession	Focuses on workplace conversations, discussing jobs, tasks, or professional roles. Includes job interviews or networking situations.
4	Technology	Covers discussions about gadgets, software, and online services. Includes troubleshooting or setting up devices.
5	Shopping	Includes phrases for buying, bargaining, asking for prices, and navigating stores or markets.
6	Eating	Deals with dining experiences, ordering food, discussing preferences, and asking about ingredients.
7	Travel	Covers navigating transportation, booking accommodations, and discussing travel plans or tourist attractions.
8	Emergency	Focuses on urgent situations, such as calling for help, reporting an accident, or describing symptoms in a medical emergency.
9	Health	Covers discussing ailments, visiting a doctor, or maintaining wellness. Includes physical and mental health topics.
10	Relationships	Deals with family, friends, and romantic relationships. Includes expressions of affection or resolving conflicts.
11	Hobbies	Focuses on leisure activities and interests, such as sports, arts, or gaming.
12	Weather	Covers discussing current weather conditions, forecasts, or seasonal preferences.
13	Housing	Covers conversations about renting or buying homes, discussing utilities, and managing household tasks.
14	Transportation	Focuses on navigating public or private transportation, discussing timetables, or giving directions.
15	Government	Deals with official processes, such as applying for IDs, permits, or resolving legal matters.
16	Finances	Covers broader financial topics, such as budgeting, discussing expenses, or making investments.
\.


--
-- Name: phrases_phrase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vli
--

SELECT pg_catalog.setval('public.phrases_phrase_id_seq', 1, false);


--
-- Name: themes_theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vli
--

SELECT pg_catalog.setval('public.themes_theme_id_seq', 1, false);


--
-- Name: phrases phrases_pkey; Type: CONSTRAINT; Schema: public; Owner: vli
--

ALTER TABLE ONLY public.phrases
    ADD CONSTRAINT phrases_pkey PRIMARY KEY (phrase_id);


--
-- Name: themes themes_pkey; Type: CONSTRAINT; Schema: public; Owner: vli
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_pkey PRIMARY KEY (theme_id);


--
-- Name: phrases phrases_theme_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vli
--

ALTER TABLE ONLY public.phrases
    ADD CONSTRAINT phrases_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(theme_id);


--
-- PostgreSQL database dump complete
--
