"use client";

import { FormEvent, useState } from "react";
import { Building2, CheckCircle2, Home, ImagePlus, UserRoundCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ServiceType = "DEVELOPER" | "BROKER" | "OWNER";

const serviceContent = {
  DEVELOPER: {
    label: "Developer project submission",
    title: "Bring your project to serious buyers",
    intro: "Share your project details and our listing team will contact you to begin verification.",
    primaryField: "Project name",
    companyField: "Developer company name",
    icon: Building2
  },
  BROKER: {
    label: "Broker property submission",
    title: "Add a property for your buyers",
    intro: "Submit a verified property opportunity. The Rivanta team will review the information and reach out to you.",
    primaryField: "Property title",
    companyField: "Brokerage or agency name",
    icon: UserRoundCheck
  },
  OWNER: {
    label: "Owner property submission",
    title: "List your property with confidence",
    intro: "Give us the details of your property and a Rivanta executive will guide you through verification.",
    primaryField: "Property title",
    companyField: "Your preferred display name (optional)",
    icon: Home
  }
} as const;

export function SellerServiceForm({ serviceType }: { serviceType: ServiceType }) {
  const content = serviceContent[serviceType];
  const Icon = content.icon;
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  function addImages(files: FileList | null) {
    if (!files) return;
    const selected = Array.from(files).filter((file) => file.type.startsWith("image/"));
    const nextImages = [...images, ...selected].slice(0, 10);
    setImages(nextImages);
    if (selected.length + images.length > 10) setMessage("You can add a maximum of 10 images.");
  }

  async function uploadImages() {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) throw new Error("Photo uploads are not configured yet.");
    return Promise.all(images.map(async (image) => {
      const upload = new FormData();
      upload.append("file", image);
      upload.append("upload_preset", uploadPreset);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: upload });
      const result = await response.json() as { secure_url?: string };
      if (!response.ok || !result.secure_url) throw new Error("One or more images could not be uploaded.");
      return result.secure_url;
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    if (images.length === 0) {
      setMessage("Please add at least one property image.");
      setIsSubmitting(false);
      return;
    }
    const form = new FormData(event.currentTarget);
    const optional = (name: string) => String(form.get(name) ?? "").trim() || undefined;
    try {
      const imageUrls = await uploadImages();
      const payload = {
      serviceType,
      name: form.get("name"), companyName: optional("companyName"), email: form.get("email"), phone: form.get("phone"), city: form.get("city"), address: optional("address"),
      images: imageUrls,
      details: {
        title: form.get("title"), propertyType: form.get("propertyType"), listingType: form.get("listingType"), price: form.get("price"), locality: form.get("locality"),
        description: form.get("description"), inventory: optional("inventory"), website: optional("website")
      }
    };
      const response = await fetch("/api/seller-leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("We could not submit this form. Please check the required fields and try again.");
      event.currentTarget.reset();
      setImages([]);
      setMessage("Submitted successfully. Our Rivanta team will review your details and contact you shortly.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not submit this form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-slate-50 py-10">
      <section className="container-shell">
        <div className="bg-navy p-7 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">{content.label}</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{content.title}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">{content.intro}</p>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <form onSubmit={submit} className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-black text-navy"><Icon className="text-green-600" /> Your details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Contact person" required />
              <Field name="companyName" label={content.companyField} />
              <Field name="email" label="Email address" type="email" required />
              <Field name="phone" label="Phone number" type="tel" required />
              <Field name="city" label="City or district" required />
              <Field name="locality" label="Locality" required />
              <Field name="title" label={content.primaryField} required />
              <Field name="price" label="Expected price or starting price" required />
              <label className="grid gap-2 text-sm font-bold text-slate-700">Property type<select name="propertyType" required className="border border-slate-200 px-3 py-3 outline-none focus:border-green-600"><option value="">Select type</option><option>Apartment</option><option>Villa</option><option>Plot</option><option>Commercial</option><option>Project</option></select></label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">Listing purpose<select name="listingType" required className="border border-slate-200 px-3 py-3 outline-none focus:border-green-600"><option value="">Select purpose</option><option>Sale</option><option>Rent</option><option>New launch</option></select></label>
              {serviceType === "DEVELOPER" && <Field name="inventory" label="Available inventory / units" />}
              {serviceType !== "OWNER" && <Field name="website" label="Website (optional)" type="url" />}
            </div>
            <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">Full address (optional)<textarea name="address" rows={3} className="border border-slate-200 px-3 py-3 outline-none focus:border-green-600" /></label>
            <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">Description and key details<textarea name="description" required rows={6} className="border border-slate-200 px-3 py-3 outline-none focus:border-green-600" placeholder="Share configuration, amenities, possession timeline, or any information buyers should know." /></label>
            <div className="mt-5 border border-dashed border-green-500 bg-green-50 p-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="font-black text-navy">Property images</p><p className="mt-1 text-sm text-slate-600">Add up to 10 clear images. At least one image is required.</p></div><label className="inline-flex w-fit cursor-pointer items-center gap-2 bg-navy px-4 py-2 text-sm font-bold text-white"><ImagePlus size={18} /> Add images<input className="sr-only" type="file" accept="image/*" multiple onChange={(event) => { addImages(event.target.files); event.currentTarget.value = ""; }} /></label></div>
              {images.length > 0 && <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">{images.map((image, index) => <div key={`${image.name}-${index}`} className="relative aspect-square overflow-hidden bg-slate-200"><img src={URL.createObjectURL(image)} alt={`Selected property image ${index + 1}`} className="h-full w-full object-cover" /><button type="button" aria-label={`Remove image ${index + 1}`} onClick={() => setImages(images.filter((_, imageIndex) => imageIndex !== index))} className="absolute right-1 top-1 grid h-7 w-7 place-items-center bg-navy text-white"><X size={15} /></button></div>)}</div>}
              <p className="mt-3 text-xs font-bold text-green-700">{images.length}/10 images selected</p>
            </div>
            {message && <p className={`mt-5 text-sm font-semibold ${message.startsWith("Submitted") ? "text-green-700" : "text-red-600"}`}>{message}</p>}
            <Button type="submit" className="mt-6" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit for Rivanta review"}</Button>
          </form>
          <aside className="h-fit border border-slate-200 bg-white p-6 shadow-sm">
            <CheckCircle2 className="text-green-600" size={28} />
            <h2 className="mt-4 text-xl font-black text-navy">What happens next</h2>
            <ol className="mt-5 grid gap-4 text-sm leading-6 text-slate-600"><li><strong className="text-navy">1. Review:</strong> Our team checks the details you submit.</li><li><strong className="text-navy">2. Contact:</strong> A Rivanta executive connects with you for verification.</li><li><strong className="text-navy">3. Next steps:</strong> We guide you toward the right listing and lead plan.</li></ol>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-bold text-slate-700">{label}<input name={name} type={type} required={required} className="border border-slate-200 px-3 py-3 outline-none focus:border-green-600" /></label>;
}
