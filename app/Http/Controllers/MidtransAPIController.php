<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;


class MidtransApiController extends Controller
{
    public function paymentHandler(Request $request)
    {
        $json = json_decode($request->getContent());
        // if (!$json) {
        //     // Body tidak valid JSON
        //     return response()->json(['message' => 'Invalid JSON'], 400);
        // }


        // SHA512(order_id+status_code+gross_amount+ServerKey)

        $serverKey = env('MIDTRANS_SERVER_KEY');

        $signature_key = hash('sha512', $json->order_id . $json->status_code . $json->gross_amount . $serverKey);

        if ($signature_key != $json->signature_key) {
            return response()->json([
                'message' => 'Invalid signature',
                'order_id' => $json->order_id,
                'status_code' => $json->status_code,
                'gross_amount' => $json->gross_amount,
                'server_key' => $serverKey,

                'calculated_signature' => $signature_key,
                'received_signature' => $json->signature_key,
            ], 403);
        }

        $signature_key = hash('sha512', $json->order_id . $json->status_code . $json->gross_amount . $serverKey);

        if ($signature_key !== $json->signature_key) {
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        // Process the order
        $order = Order::where('order_id', $json->order_id)->first();

        if ($order) {
            // $order->status = $json->transaction_status;
            // $order->transaction_id = $json->transaction_id;
            // $order->payment_type = $json->payment_type;
            // $order->save();
            $order->update([
                'status' => $json->transaction_status,
                'transaction_id' => $json->transaction_id,
                'payment_type' => $json->payment_type,
            ]);
        }

        return response()->json(['message' => 'Notification handled successfully'], 200);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
