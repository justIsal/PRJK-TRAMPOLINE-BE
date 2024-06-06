const Tiket= require('../models/TiketModels');
const User = require('../models/UserModels');
exports.createTiket = async(req,res) => {
    try{
        console.log(req.body)
		const { name,noWa,tanggalLahir,tipePengguna,jenisKeanggotaan,idAnggota,kdTempat,sesiBooking,tanggalBooking,waktuPesan,isVerified } = req.body;
		const newUser = new User({ name,noWa,tanggalLahir,tipePengguna,jenisKeanggotaan,idAnggota });
		const saveUser = await newUser.save();
		const idUser = saveUser._id;

        const tiket = new Tiket( { idUser,kdTempat,sesiBooking,tanggalBooking,waktuPesan,isVerified });
        const newTiket = await tiket.save();
		console.log(newTiket)
        res.status(201).json(newTiket);
    }catch(err){
        res.status(500).json({error: "Failed to create Tiket"});
        console.log(req.body)
        console.log(err)
    }
}
exports.getAllTikets = async (req, res) => {
	try {
		// const tikets = await Tiket.find({});
		const tikets = await Tiket.aggregate([
			{
				$lookup: {
					from: 'Users',
					localField: 'idUser',
					foreignField: '_id',
					as: 'user',
				},
			},
			{
				$unwind: '$user',
			},
			{
				$project: {
					_id: 1,
					kdTempat: 1,
					sesiBooking: 1,
					tanggalBooking: 1,
					waktuPesan: 1,
					isVerified: 1,
					idAnggota: "$user.idAnggota",
					name: "$user.name",
					noWa: "$user.noWa",
					tanggalLahir: "$user.tanggalLahir",
					tipePengguna: "$user.tipePengguna",
					jenisKeanggotaan: "$user.jenisKeanggotaan",
				},
			},
		]);
		res.status(200).json(tikets);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch tikets' });
	}
};
exports.getTiketById = async (req, res) => {
	try {
		const idTiket = req.params.id;

        const tiket = await Tiket.findOne({ _id: idTiket });

        if (!tiket) {
            return res.status(404).json({ error: 'Tiket not found' });
        }

        const user = await User.findOne({ _id: tiket.idUser });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const result = {
            _id: tiket._id,
            kdTempat: tiket.kdTempat,
            sesiBooking: tiket.sesiBooking,
            tanggalBooking: tiket.tanggalBooking,
            waktuPesan: tiket.waktuPesan,
            isVerified: tiket.isVerified,
            idAnggota: user.idAnggota,
            name: user.name,
			noWa: user.noWa,
            tanggalLahir: user.tanggalLahir,
            tipePengguna: user.tipePengguna,
            jenisKeanggotaan: user.jenisKeanggotaan,
        };
		
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch tiket' });
	}
};

exports.updateTiket = async (req, res) => {
	try {
		// const tiketData = req.body;
		const { name,noWa,tanggalLahir,tipePengguna,jenisKeanggotaan,idAnggota,kdTempat,sesiBooking,tanggalBooking,waktuPesan,isVerified } = req.body;
		const dataUser = { 
			name,
			noWa,
			tanggalLahir,
			tipePengguna,
			jenisKeanggotaan,
			idAnggota
		};
		const dataTiket = {
			kdTempat,
			sesiBooking,
			tanggalBooking,
			waktuPesan,
			isVerified 
		}
		const tiket = await Tiket.findByIdAndUpdate(req.params.id, dataTiket, {
			new: true,
		});
        if (!tiket) {
			return res.status(404).json({ error: 'Tiket not found' });
        }
		const idUser = tiket.idUser;
		console.log(idUser);
		const user = await User.findByIdAndUpdate(idUser, dataUser, {
			new: true,
		});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        };

		const result = {
            _id: tiket._id,
            kdTempat: tiket.kdTempat,
            sesiBooking: tiket.sesiBooking,
            tanggalBooking: tiket.tanggalBooking,
            waktuPesan: tiket.waktuPesan,
            isVerified: tiket.isVerified,
            idAnggota: user.idAnggota,
            name: user.name,
            tanggalLahir: user.tanggalLahir,
            tipePengguna: user.tipePengguna,
            jenisKeanggotaan: user.jenisKeanggotaan,
        };

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: 'Failed to update tiket' });
	}
};

exports.deleteTiketById = async (req, res) => {
	try {
		const tiket = await Tiket.findByIdAndDelete(req.params.id);
		const idUser = tiket.idUser;
		
		const user = await User.findByIdAndDelete(idUser);

		if (!user) {
			return res.status(404).json({ error: 'tiket not found' });
		}
		res.status(200).json({ message: 'tiket deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete tiket' });
	}
};


exports.deleteTiket = async (req, res) => {
	try {
		const data = req.body;
		const deletedTikets = await Promise.all(
			data.map(async (item) => {
			  const tiket = await Tiket.findByIdAndDelete(item._id);
			  return tiket;
			})
		);
		const notFoundTikets = deletedTikets.filter((tiket) => !tiket);
		if (notFoundTikets.length > 0) {
		  return res.status(404).json({ error: 'Some tikets not found' });
		}
		res.status(200).json({ message: 'tiket deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete tiket' });
	}
};
