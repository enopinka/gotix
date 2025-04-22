
import CustomerLayout from "@/Layouts/CustomerLayout";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
  } from "@/Components/ui/tabs"
  import { Card, CardContent } from "@/Components/ui/card"
  import { Button } from "@/Components/ui/button"
  import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react"

export default function DetailsEvent() {
    
    return (
        <>
            <CustomerLayout>
        <div className="max-w-5xl mx-auto py-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
             {/* Banner */}
        <img
          src="/carousel/carousel6.jpg"
          alt="Event Banner"
          className="rounded-xl max-w-md object-cover"
        />
  
        {/* Info Card */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">
              Sabrina Carpenter Short n Sweet - Concert
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>25 Apr 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>19.00 - 22.00 WIB</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                <span>Jakarta, DKI Jakarta</span>
              </div>
            </div>
            <div className="text-sm">Diselenggarakan oleh <b>Flabbergast Productions</b></div>
          </CardContent>
        </Card>
  
        </div>
    
        {/* Tabs */}
        <Tabs defaultValue="ticket" >
          <TabsList className="w-full">
            <TabsTrigger value="desc" className="w-full" >Deskripsi</TabsTrigger>
            <TabsTrigger value="ticket" className="w-full">Tiket</TabsTrigger>
          </TabsList>
  
          <TabsContent value="desc" className="pt-4">
            <p className="py-1 text-justify">
            ✨ Short n’ Sweet is Sabrina Carpenter’s shimmering pop return — bold, flirty, and irresistibly catchy. 
            With a kiss mark on her shoulder and a soft retro glow, the album cover perfectly captures the essence of the songs inside: a mix of confidence, cheekiness, and vulnerability.
            Dibalut dalam visual ala 70s glam, Sabrina tampil fierce dan feminin, menatap tajam dengan pancaran warna violet dan gold yang dreamy. Setiap track seperti Espresso, Bed Chem, dan Please Please Please menawarkan cerita pendek nan manis — just like the title.
            Whether it’s about love, heartbreak, or playful sarcasm, Short n’ Sweet is a capsule of emotions wrapped in sugar-pop brilliance.
            </p>
          </TabsContent>
  
          <TabsContent value="ticket" className="pt-4 space-y-4">
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold">Fansign Event</h4>
                  <p className="text-xs text-muted-foreground">Mulai dari Rp429.000</p>
                </div>
                <Button>Beli Tiket</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

            </CustomerLayout>
        </>
    );
}
