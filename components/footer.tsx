import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
	return (
		<footer id="footer" className="bg-card text-card-foreground border-t border-border/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					{/* Company Info */}
					<div>
						<div className="flex items-center gap-2 mb-4">
							<span className="font-bold text-foreground">
								Dexter Logistics
							</span>
						</div>
						<p className="text-sm text-foreground/70">
							Premier cargo, logistics, and freight-forwarding
							services connecting Pakistan to the world.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="font-semibold mb-4 text-foreground">
							Quick Links
						</h3>
						<ul className="space-y-2 text-sm text-foreground/70">
							<li>
								<a
									href="#home"
									className="hover:text-primary transition-colors"
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="#services"
									className="hover:text-primary transition-colors"
								>
									Services
								</a>
							</li>
							<li>
								<a
									href="#why-dexter"
									className="hover:text-primary transition-colors"
								>
									Why Dexter
								</a>
							</li>
							<li>
								<a
									href="#destinations"
									className="hover:text-primary transition-colors"
								>
									Destinations
								</a>
							</li>
						</ul>
					</div>

					{/* Services */}
					<div>
						<h3 className="font-semibold mb-4 text-foreground">
							Services
						</h3>
						<ul className="space-y-2 text-sm text-foreground/70">
							<li>
								<a
									href="#services"
									className="hover:text-primary transition-colors"
								>
									Air Freight
								</a>
							</li>
							<li>
								<a
									href="#services"
									className="hover:text-primary transition-colors"
								>
									Cargo Services
								</a>
							</li>
							<li>
								<a
									href="#services"
									className="hover:text-primary transition-colors"
								>
									Freight Forwarding
								</a>
							</li>
							<li>
								<a
									href="#services"
									className="hover:text-primary transition-colors"
								>
									DDP Service
								</a>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					{/* Contact Info */}
					<div>
						<h3 className="font-semibold mb-4 text-foreground">
							Contact
						</h3>
						<ul className="space-y-3 text-sm text-foreground/70">
							{/* Phone Numbers */}
							<li className="flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<Phone className="h-4 w-4 text-primary" />
									<span>+92 (332) 8884396</span>
								</div>
								<div className="flex items-center gap-2">
									{/* WhatsApp icon inline SVG */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 32 32"
										className="h-4 w-4 text-green-500"
										fill="currentColor"
									>
										<path d="M16.004 2.99C9.376 2.99 4 8.366 4 14.994c0 2.64.868 5.066 2.334 7.04L4 30l8.14-2.312a11.924 11.924 0 0 0 3.864.62c6.628 0 12.004-5.376 12.004-12.004S22.632 2.99 16.004 2.99zm0 21.516a9.44 9.44 0 0 1-4.79-1.312l-.344-.204-4.83 1.37 1.372-4.708-.224-.362a9.415 9.415 0 0 1-1.46-5.206c0-5.204 4.23-9.436 9.436-9.436 5.206 0 9.436 4.23 9.436 9.436s-4.23 9.422-9.436 9.422zm5.464-6.94c-.298-.148-1.77-.874-2.042-.972-.274-.1-.474-.148-.67.15-.2.3-.77.972-.944 1.172-.174.2-.348.224-.646.076-.298-.148-1.258-.464-2.394-1.478-.886-.79-1.482-1.77-1.656-2.066-.172-.298-.018-.458.13-.606.134-.134.298-.348.446-.522.148-.174.198-.298.298-.498.1-.2.05-.374-.024-.522-.074-.148-.67-1.62-.92-2.224-.242-.582-.488-.504-.67-.514l-.57-.01a1.1 1.1 0 0 0-.8.374c-.274.3-1.044 1.02-1.044 2.486 0 1.466 1.07 2.882 1.22 3.082.148.2 2.108 3.216 5.106 4.514.714.308 1.27.492 1.704.63.716.226 1.368.194 1.884.118.574-.086 1.77-.722 2.022-1.42.25-.698.25-1.294.174-1.42-.074-.126-.274-.2-.572-.348z" />
									</svg>
									<a
										href="https://wa.me/923326135002"
										target="_blank"
										rel="noreferrer"
										className="hover:text-primary transition-colors"
									>
										+92 (332) 6135002
									</a>
									<span className="text-xs text-foreground/50">
										(WhatsApp only)
									</span>
								</div>
								<div className="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 32 32"
										className="h-4 w-4 text-green-500"
										fill="currentColor"
									>
										<path d="M16.004 2.99C9.376 2.99 4 8.366 4 14.994c0 2.64.868 5.066 2.334 7.04L4 30l8.14-2.312a11.924 11.924 0 0 0 3.864.62c6.628 0 12.004-5.376 12.004-12.004S22.632 2.99 16.004 2.99zm0 21.516a9.44 9.44 0 0 1-4.79-1.312l-.344-.204-4.83 1.37 1.372-4.708-.224-.362a9.415 9.415 0 0 1-1.46-5.206c0-5.204 4.23-9.436 9.436-9.436 5.206 0 9.436 4.23 9.436 9.436s-4.23 9.422-9.436 9.422zm5.464-6.94c-.298-.148-1.77-.874-2.042-.972-.274-.1-.474-.148-.67.15-.2.3-.77.972-.944 1.172-.174.2-.348.224-.646.076-.298-.148-1.258-.464-2.394-1.478-.886-.79-1.482-1.77-1.656-2.066-.172-.298-.018-.458.13-.606.134-.134.298-.348.446-.522.148-.174.198-.298.298-.498.1-.2.05-.374-.024-.522-.074-.148-.67-1.62-.92-2.224-.242-.582-.488-.504-.67-.514l-.57-.01a1.1 1.1 0 0 0-.8.374c-.274.3-1.044 1.02-1.044 2.486 0 1.466 1.07 2.882 1.22 3.082.148.2 2.108 3.216 5.106 4.514.714.308 1.27.492 1.704.63.716.226 1.368.194 1.884.118.574-.086 1.77-.722 2.022-1.42.25-.698.25-1.294.174-1.42-.074-.126-.274-.2-.572-.348z" />
									</svg>
									<a
										href="https://wa.me/447404654725"
										target="_blank"
										rel="noreferrer"
										className="hover:text-primary transition-colors"
									>
										+44 7404654725
									</a>
									<span className="text-xs text-foreground/50">
										(WhatsApp only)
									</span>
								</div>
							</li>

							{/* Email */}
							<li className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-primary" />
								<a
									href="mailto:dextertradeltd@gmail.com"
									className="hover:text-primary transition-colors"
								>
									dextercargologistics@gmail.com
								</a>
							</li>

							{/* Address */}
							<li className="flex items-start gap-2">
								<MapPin className="h-4 w-4 mt-0.5 text-primary" />
								<span>
									1 Wheatmen Rd, Shalimar Larechs Colony,
									Lahore, 54000 Pakistan
								</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-border/40 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
						<p>
							&copy; {new Date().getFullYear()} Dexter Logistics and Couriers. All
							rights reserved.
						</p>
						<div className="flex gap-6 mt-4 md:mt-0">
							<a
								href="#"
								className="hover:text-primary transition-colors"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="hover:text-primary transition-colors"
							>
								Terms of Service
							</a>
							<a
								href="#"
								className="hover:text-primary transition-colors"
							>
								Sitemap
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
