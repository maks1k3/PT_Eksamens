import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const colors = path.join(__dirname, 'main/assets/styles', 'colors.less');
let target = 'http://razotsgodinos2.dobinnovations.lv';

const proxySettings = {
	changeOrigin: true,
	target: target,
	secure: false,
	ws: true,
	headers: {
		'remote-dev-server': 'yes',
	},
	autoRewrite: true,
	bypass: function (req, res) {
		// console.log(res.socket);
		if (req.headers['origin'] === undefined) {
			// console.log('undefined:', req.url);
		}

		if (
			req.url.startsWith('/main') ||
			req.url.startsWith('/admin/') ||
			req.url.startsWith('/node_modules') ||
			req.url.startsWith('/@vite') ||
			req.url.startsWith('/modules') ||
			req.url.startsWith('/@id') ||
			req.url.startsWith('/@react-refresh')
		) {
			return req.url; // do not proxy
		} else {
			return undefined; // proxy everything else
		}
	},
};
export default defineConfig({
	plugins: [react()],
	base: '/',
	resolve: {
		alias: {
			admin: path.resolve(__dirname, 'admin'),
			main: path.resolve(__dirname, 'main'),

			ui: path.resolve(__dirname, './modules/ui'),
			assets: path.resolve(__dirname, './modules/assets'),
			core: path.resolve(__dirname, './modules/core'),
			vendor: path.resolve(__dirname, './modules/vendor'),
			popups: path.resolve(__dirname, './modules/popups'),
			hoc: path.resolve(__dirname, './modules/hoc'),
			cms: path.resolve(__dirname, './modules/cms'),
			helpers: path.resolve(__dirname, './modules/helpers'),
			utils: path.resolve(__dirname, './modules/utils'),
			hud: path.resolve(__dirname, './modules/hud'),
			// assets: path.resolve(__dirname, "./main/assets"),
		},
	},
	less: {
		modules: {
			localsConvention: 'camelCase',
			generateScopedName: '[name]_[local]_[hash:base64:2]',
		},
	},

	server: {
		host: 'remote-dev-server',
		port: 8080,
		hmr: {
			port: 8181,
			host: 'remote-dev-server',
		},
		proxy: {
			'/': proxySettings,
		},
	},

	css: {
		preprocessorOptions: {
			less: {
				strictMath: true,
				globalVars: {
					colors: `'${colors}'`,
				},
			},
		},
		modules: {
			localsConvention: 'camelCase',
			generateScopedName: '[name]_[local]_[hash:base64:2]',
		},
	},
	build: {
		outDir: '../public_html/dist',
		assetsDir: '',
		rollupOptions: {
			external: [],
			input: {
				public: 'main/main.jsx',
				administration: 'admin/Administration.jsx',
			},
			output: {
				// manualChunks: false,
				entryFileNames: '[name].js',
				assetFileNames: '[name].css',
				manualChunks: {
					['lodash-es']: ['lodash-es'],
					['modules']: ['core/Root'],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
	},
	define: {
		'process.env': process.env,
	},
});
