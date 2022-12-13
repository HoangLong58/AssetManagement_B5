INSERT INTO public.role (id, name)
VALUES (DEFAULT, 'ADMIN');
INSERT INTO public.role (id, name)
VALUES (DEFAULT, 'STAFF');
INSERT INTO public.location(code, name)
VALUES ('HCM', 'HO CHI MINH');
INSERT INTO public.location(code, name)
VALUES ('HN', 'HA NOI');
INSERT INTO public.location(code, name)
VALUES ('DN', 'DA NANG');

--category
INSERT INTO public.category(id, name, total_quantity)
VALUES ('LT', 'LAPTOP', 2);
INSERT INTO public.category(id, name, total_quantity)
VALUES ('PC', 'Personal computer', 1);

--admin--
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('SD0001', '2000-07-22 07:00:00.000000', 'Van', true, '2022-07-22 07:00:00.000000',
        'Nguyen',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'vann', 'HCM', 1, 'INIT');
-- user name : vann pass: 123
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('SD0002', '2001-05-20 07:00:00.000000', 'Quoc', true,
        '2020-06-22 07:00:00.000000', 'Pham',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'quocp', 'DN', 1, 'INIT');
-- user name : quocp pass: 123
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('SD0003', '2000-06-19 07:00:00.000000', 'Duc', true, '2021-07-22 07:00:00.000000',
        'Nguyen',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'ducn', 'HN', 1, 'INIT');
-- user name : ducn pass: 123
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('SD0004', '2000-01-01 07:00:00.000000', 'Hue', true, '2022-06-22 07:00:00.000000',
        'Ton',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'huet', 'HCM', 1, 'INIT');
-- user name : huet pass: 123
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('SD0005', '2001-12-12 07:00:00.000000', 'Long', true,
        '2020-07-22 07:00:00.000000', 'Truong',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'longt', 'HCM', 1, 'INIT');
-- user name : longt pass: 123
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('AT0001', '2001-07-07 07:00:00.000000', 'Linh', true,
        '2022-07-07 07:00:00.000000', 'Truong',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'linht', 'DN', 1, 'INIT');
-- user name : linht pass: 123
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('AT0002', '2000-08-08 07:00:00.000000', 'Nhat', true,
        '2022-06-22 07:00:00.000000', 'Do',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'nhatd', 'HN', 1, 'INIT');
-- user name : nhatd pass: 123

--staff--
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('SD0006', '2000-06-19 07:00:00.000000', 'Goku', true,
        '2022-07-22 07:00:00.000000', 'Nguyen',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'gokun', 'HCM', 2, 'INIT');
-- user name : gokun pass: 123
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('SD0007', '1999-06-19 07:00:00.000000', 'Conan', true,
        '2020-06-22 07:00:00.000000', 'Yang',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'conany', 'HCM', 2, 'INIT');
-- user name : conany pass: 123
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('AT0003', '1998-06-19 07:00:00.000000', 'Depp', true,
        '2020-06-22 07:00:00.000000', 'Johny',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'deppj', 'HN', 2, 'INIT');
-- user name : deppj pass: 123
INSERT INTO public.users (staff_code, birth_date, first_name, gender, joined_date,
                          last_name, password, username,
                          location_id, role_id, state)
VALUES ('AT0004', '1995-06-19 07:00:00.000000', 'Amber', true,
        '2020-06-22 07:00:00.000000', 'Dun',
        '$2a$10$r3uRMuUjABLpLEK16a2z3ul7dHRQCRRR58jGsvhaJL3WJZlNH/E3y',
        'amberd', 'DN', 2, 'INIT');
-- user name : amberd pass: 123

INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('1', '2021-09-12 00:00:00', 'Crissie', 'True', '2021-10-24 00:00:00', 'Aronowicz',
        'iEQrn4', 'ACTIVE',
        'caronowicz0', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('10', '2021-09-18 00:00:00', 'Spence', 'True', '2022-05-25 00:00:00', 'Prosser',
        'j5zJPvcsi', 'ACTIVE',
        'sprosser9', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('11', '2021-12-03 00:00:00', 'Marna', 'True', '2021-12-30 00:00:00', 'Olenchenko',
        'vjhCywxxvhh', 'ACTIVE',
        'molenchenkoa', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('12', '2022-05-20 00:00:00', 'Griff', 'False', '2022-02-12 00:00:00', 'Mathieu',
        'dQTlWqc3QYO', 'ACTIVE',
        'gmathieub', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('13', '2021-10-26 00:00:00', 'Karney', 'True', '2021-10-25 00:00:00', 'Loudiane',
        'aUdyMDnzY', 'ACTIVE',
        'kloudianec', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('14', '2021-12-21 00:00:00', 'Danita', 'True', '2022-07-20 00:00:00', 'Olden',
        'zgVMgzjDf', 'ACTIVE', 'doldend',
        'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('15', '2021-07-30 00:00:00', 'Dolf', 'False', '2021-11-07 00:00:00', 'Yeudall',
        'u6SXYMSmp', 'ACTIVE',
        'dyeudalle', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('16', '2021-12-10 00:00:00', 'Findley', 'True', '2021-11-15 00:00:00',
        'Pembridge', 'STVpdf1aUVWy', 'ACTIVE',
        'fpembridgef', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('17', '2021-10-24 00:00:00', 'Sosanna', 'False', '2021-11-13 00:00:00',
        'Baverstock', 'jFp3b4G', 'ACTIVE',
        'sbaverstockg', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('18', '2022-02-23 00:00:00', 'Kirbie', 'True', '2021-12-24 00:00:00', 'Spofforth',
        'Kq44JI', 'ACTIVE',
        'kspofforthh', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('19', '2021-08-13 00:00:00', 'Melli', 'False', '2021-07-23 00:00:00', 'Milksop',
        'pjsxZV', 'ACTIVE',
        'mmilksopi', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('2', '2021-11-10 00:00:00', 'Melinde', 'True', '2022-01-01 00:00:00', 'Newby',
        't41mmGBc', 'ACTIVE', 'mnewby1',
        'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('20', '2022-07-07 00:00:00', 'Raychel', 'True', '2022-02-17 00:00:00', 'Trayling',
        'ORTuLGhlD6', 'ACTIVE',
        'rtraylingj', 'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('21', '2022-05-13 00:00:00', 'Durward', 'True', '2022-01-20 00:00:00', 'Frude',
        '2XOBNeAJ', 'ACTIVE', 'dfrudek',
        'HN', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('22', '2022-04-05 00:00:00', 'Marrissa', 'True', '2021-11-18 00:00:00',
        'Cornfield', 'bOxIPnz', 'ACTIVE',
        'mcornfieldl', 'HN', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('23', '2021-07-31 00:00:00', 'Derwin', 'False', '2022-06-22 00:00:00', 'Smoth',
        'SE2S0jeHvIOz', 'ACTIVE',
        'dsmothm', 'HN', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('24', '2021-08-11 00:00:00', 'Mason', 'False', '2022-03-16 00:00:00', 'Grebner',
        'DNYV2QMne5', 'ACTIVE',
        'mgrebnern', 'HN', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('25', '2022-07-04 00:00:00', 'Thorpe', 'False', '2021-11-06 00:00:00', 'Branton',
        '4fBGUA21', 'ACTIVE',
        'tbrantono', 'HN', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('26', '2021-09-07 00:00:00', 'Jermayne', 'True', '2021-07-23 00:00:00',
        'Dominguez', 'FT1OQ9oMGfBJ', 'ACTIVE',
        'jdominguezp', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('27', '2021-08-21 00:00:00', 'Nonnah', 'False', '2022-06-04 00:00:00', 'Chisolm',
        'SAU9ZwV', 'ACTIVE',
        'nchisolmq', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('28', '2021-08-22 00:00:00', 'Evered', 'True', '2022-04-15 00:00:00', 'Yakob',
        'gIrlzzPWZ', 'ACTIVE', 'eyakobr',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('29', '2021-10-12 00:00:00', 'Ardith', 'False', '2022-04-19 00:00:00', 'Benwell',
        'P910t6SPYfv', 'ACTIVE',
        'abenwells', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('3', '2021-10-11 00:00:00', 'Merrilee', 'True', '2022-06-16 00:00:00', 'Primrose',
        'urrZJuXT2Ak', 'ACTIVE',
        'mprimrose2', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('30', '2022-05-24 00:00:00', 'Justino', 'True', '2022-04-27 00:00:00',
        'Vasilchenko', 'EpCO8fYZ', 'ACTIVE',
        'jvasilchenkot', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('31', '2022-01-28 00:00:00', 'Benjamin', 'False', '2022-04-27 00:00:00',
        'Scholig', 'AIpdCnjrQVT', 'ACTIVE',
        'bscholigu', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('32', '2021-11-21 00:00:00', 'Mile', 'False', '2022-07-14 00:00:00', 'Wolfe',
        'i8quGjOW', 'ACTIVE', 'mwolfev',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('33', '2021-12-15 00:00:00', 'Timotheus', 'False', '2022-02-25 00:00:00',
        'Haggeth', 'yuZ610l5dl', NULL,
        'thaggethw', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('34', '2022-05-04 00:00:00', 'Nathan', 'True', '2022-03-01 00:00:00', 'Goodridge',
        'SidV8hJn', NULL,
        'ngoodridgex', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('35', '2021-09-12 00:00:00', 'Mirabelle', 'False', '2021-12-14 00:00:00',
        'Petrolli', '9EQwXE113z', NULL,
        'mpetrolliy', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('36', '2022-04-16 00:00:00', 'Irvine', 'True', '2021-11-15 00:00:00', 'Gooddy',
        'rBg9rgiWPS55', NULL,
        'igooddyz', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('37', '2021-07-23 00:00:00', 'Beckie', 'True', '2021-10-26 00:00:00', 'Grills',
        '9Wv2Qge', NULL, 'bgrills10',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('38', '2021-12-30 00:00:00', 'Trev', 'False', '2022-01-03 00:00:00', 'Nower',
        'MEd648qc0G', NULL, 'tnower11',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('39', '2022-04-25 00:00:00', 'Gabbi', 'False', '2021-11-17 00:00:00', 'Fitzjohn',
        'bHJvuP32', NULL,
        'gfitzjohn12', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('4', '2021-12-15 00:00:00', 'Keenan', 'False', '2022-01-01 00:00:00', 'Carillo',
        'aeaWV7YLD', NULL, 'kcarillo3',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('40', '2022-04-29 00:00:00', 'Germain', 'True', '2022-03-09 00:00:00',
        'Yakobowitz', '8TwdjWArO', NULL,
        'gyakobowitz13', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('41', '2022-03-11 00:00:00', 'Ches', 'False', '2022-03-11 00:00:00', 'Janik',
        'GeLyurUx4', NULL, 'cjanik14',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('42', '2022-01-31 00:00:00', 'Sabra', 'True', '2021-11-21 00:00:00', 'Yantsev',
        'cuktyn', NULL, 'syantsev15',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('43', '2021-08-29 00:00:00', 'Gladi', 'False', '2021-09-18 00:00:00', 'Tythe',
        'L1JIqMuzOp2', NULL, 'gtythe16',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('44', '2022-04-29 00:00:00', 'Lucila', 'True', '2022-02-21 00:00:00', 'Hallin',
        'NKUtkp', NULL, 'lhallin17',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('45', '2021-10-15 00:00:00', 'Brendin', 'True', '2021-12-05 00:00:00',
        'Reilingen', 'Y3My5MX5Q', NULL,
        'breilingen18', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('46', '2022-01-10 00:00:00', 'Isabel', 'False', '2022-05-07 00:00:00', 'Cassey',
        'AgG0OJ', NULL, 'icassey19',
        'HN', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('47', '2022-07-13 00:00:00', 'Monica', 'False', '2022-05-17 00:00:00', 'Malley',
        'nhZT5Wrn', NULL, 'mmalley1a',
        'HN', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('48', '2022-07-14 00:00:00', 'Laurella', 'True', '2022-03-11 00:00:00',
        'LLelweln', 'cbBAAflkO', NULL,
        'lllelweln1b', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('49', '2022-02-11 00:00:00', 'Hasheem', 'True', '2022-07-06 00:00:00',
        'Rosenberg', '00gS5UDYcQb', NULL,
        'hrosenberg1c', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('5', '2022-04-01 00:00:00', 'Franni', 'False', '2022-06-26 00:00:00', 'Lansberry',
        'ukIVFh08O', NULL,
        'flansberry4', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('50', '2021-11-18 00:00:00', 'Iormina', 'True', '2021-11-10 00:00:00', 'Harder',
        'XlnhyWPAVA', NULL,
        'iharder1d', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('51', '2022-07-21 00:00:00', 'Alec', 'True', '2022-06-03 00:00:00', 'Whysall',
        'igLgcMH5gDI9', NULL,
        'awhysall1e', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('52', '2021-11-19 00:00:00', 'Bathsheba', 'False', '2022-02-02 00:00:00',
        'Roscamp', 'ukvCMoqejiG', NULL,
        'broscamp1f', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('53', '2022-05-09 00:00:00', 'Morey', 'True', '2021-12-20 00:00:00', 'Smooth',
        'BuL9HVX', NULL, 'msmooth1g',
        'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('54', '2022-01-11 00:00:00', 'Obediah', 'True', '2022-04-01 00:00:00', 'Paradis',
        '5GzaSrsn3', NULL,
        'oparadis1h', 'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('55', '2022-06-25 00:00:00', 'Rutger', 'False', '2022-06-05 00:00:00', 'Harkness',
        '3RXQKL0pL', NULL,
        'rharkness1i', 'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('56', '2022-03-14 00:00:00', 'Emmalynn', 'True', '2022-05-20 00:00:00', 'Blanket',
        'S0qOsx71kJU', NULL,
        'eblanket1j', 'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('57', '2021-08-06 00:00:00', 'Ezekiel', 'True', '2022-02-13 00:00:00', 'Josephy',
        'EZy5HcwMHy9', NULL,
        'ejosephy1k', 'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('58', '2021-12-13 00:00:00', 'Dexter', 'False', '2021-11-20 00:00:00',
        'Haresnaip', 'IFNtQQkzug', NULL,
        'dharesnaip1l', 'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('59', '2022-05-28 00:00:00', 'Carla', 'True', '2022-01-31 00:00:00', 'Mennell',
        'dy6u0gqNt', NULL, 'cmennell1m',
        'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('6', '2022-03-05 00:00:00', 'Agace', 'False', '2022-03-25 00:00:00', 'Schofield',
        'EYWZFHaFXz', NULL,
        'aschofield5', 'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('60', '2022-03-17 00:00:00', 'Lavena', 'False', '2022-04-05 00:00:00', 'Muspratt',
        '1nQBdQd', NULL,
        'lmuspratt1n', 'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('7', '2021-09-12 00:00:00', 'Shanon', 'False', '2021-09-14 00:00:00', 'Cathcart',
        '8grxYT', NULL, 'scathcart6',
        'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('8', '2021-08-24 00:00:00', 'Carole', 'True', '2021-11-14 00:00:00', 'Winchurch',
        'cLcR9MMqjml', NULL,
        'cwinchurch7', 'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('9', '2021-07-25 00:00:00', 'Jocelin', 'False', '2021-08-21 00:00:00', 'Jose',
        'ChnLPpv9KHXh', NULL, 'jjose8',
        'HCM', 2);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('SD0008', '2000-01-01 00:00:00', 'Pham', 'False', '2022-01-01 00:00:00', 'Quoc',
        '$2a$12$s4kBd2orOFTrguMyfogm4O.6AXExpzUnK2x3REaA8xRq4enKt/JAa', 'INIT', 'pquoc',
        'HCM', 1);
INSERT INTO users(staff_code, birth_date, first_name, gender, joined_date, last_name,
                  password, state, username,
                  location_id, role_id)
VALUES ('SD0009', '2000-01-01 00:00:00', 'Nguyen', 'True', '2022-01-01 00:00:00', 'Trai',
        '$2a$12$s4kBd2orOFTrguMyfogm4O.6AXExpzUnK2x3REaA8xRq4enKt/JAa', 'INIT', 'ntrai',
        'HCM', 1);

--asset--
INSERT INTO public.asset(asset_code, asset_name, installed_date, specification, state,
                         category_id, location_id,
                         user_id)
VALUES ('LT0001', 'Laptop HP', '2000-07-22 07:00:00.000000', 'laptop hp in 30/7',
        'AVAILABLE', 'LT', 'HCM', 'SD0001');
INSERT INTO public.asset(asset_code, asset_name, installed_date, specification, state,
                         category_id, location_id,
                         user_id)
VALUES ('LT0002', 'Laptop HP', '2000-07-22 07:00:00.000000', 'laptop hp in 30/7',
        'AVAILABLE', 'LT', 'HN', 'SD0001');
INSERT INTO public.asset(asset_code, asset_name, installed_date, specification, state,
                         category_id, location_id,
                         user_id)
VALUES ('PC0001', 'Personal Computer HP', '2000-07-22 07:00:00.000000', 'PC hp in 30/7',
        'AVAILABLE', 'PC', 'HCM',
        'SD0001');