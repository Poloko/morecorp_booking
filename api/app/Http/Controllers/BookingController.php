<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    /**
     * edit booking
     * @param  \Illuminate\Http\Request  $request
     * @return Json
     *
     */
    public function alter(Request $request){
        $bookings = auth()->user()->bookings()->find($request->booking_id);
 
        if (!$bookings) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 400);
        }
        $v = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required'], 'string', 'email', 'max:60',
            'message' => ['required', 'string', 'max:255'],
            'contact_number' => ['required', 'string', 'max:10'],
            'booking_id' => ['required'],
            'booking_date' => ['required'],
            'booking_start_time' => ['required'],
            'booking_end_time' => ['required']
        ]);
 
        if ($v->fails())
        {
            return response()->json(['success'=>false,'process'=>'update'],401);
        }

        $bookings->name = $request->name;
        $bookings->email = $request->email;
        $bookings->message = $request->message;
        $bookings->contact_number = $request->contact_number;
        $bookings->booking_date = $request->booking_date;
        $bookings->booking_start_time = $request->booking_start_time;
        $bookings->booking_end_time = $request->booking_end_time;
         
        
        if (auth()->user()->bookings()->save($bookings))
            return response()->json([
                'success' => true,
                'data' => $bookings->toArray()
            ], 201);
        else
            return response()->json([
                'success' => false,
                'message' => 'Post not added'
            ], 500);
    }
    /**
     * save booking
     * @param  \Illuminate\Http\Request  $request
     * @return Json
     *
     */
    public function store(Request $request){
        $v = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required'], 'string', 'email', 'max:60',
            'message' => ['required', 'string', 'max:255'],
            'contact_number' => ['required', 'string', 'max:10'],
            'booking_date' => ['required'],
            'booking_start_time' => ['required'],
            'booking_end_time' => ['required']
        ]);
 
        if ($v->fails())
        {
            return response()->json(['success'=>false,'process'=>'create'], 401);
        }
        
        $booking = new Booking();
        $booking->name = $request->name;
        $booking->email = $request->email;
        $booking->message = $request->message;
        $booking->contact_number = $request->contact_number;
        $booking->booking_date = $request->booking_date;
        $booking->booking_start_time = $request->booking_start_time;
        $booking->booking_end_time = $request->booking_end_time;
 
        if (auth()->user()->bookings()->save($booking))
            return response()->json([
                'success' => true,
                'data' => $booking->toArray()
            ], 201);
        else
            return response()->json([
                'success' => false,
                'message' => 'Post not added'
            ], 500);
    }
    /**
     * list user booking
     * @param  \Illuminate\Http\Request  $request
     *
     */
    public function list_user(Request $request){
        $v = Validator::make($request->all(), [
            'from' => ['required'],
            'to' => ['required']
        ]);
 
        if ($v->fails())
        {
            return response()->json(['success'=>false,'process'=>'list'],401);
        }
        $from = $request->from;
        $to = $request->to;
        $data = Booking::whereBetween('booking_date', [$from, $to])->where('user_id',auth()->user()->id)->orderBy('booking_date', 'DESC')->get();
        // $data = DB::table('bookings')
        //         ->whereDate('booking_date', '=>', date('Y-m-d',strtotime($from)))
        //         ->whereDate('booking_date', '<=', date('Y-m-d',strtotime($from)))
        //         ->get();
        return response()->json(['success'=>true,'process'=>'list','data'=>$data],201);
    }
    /**
     * delete booking
     * @param  \Illuminate\Http\Request  $request
     * @return Json
     *
     */
    public function destroy(Request $request){
        $v = Validator::make($request->all(), [
            'booking_id' => ['required']
        ]);
 
        if ($v->fails())
        {
            return response()->json(['success'=>false,'process'=>'delete'],401);
        }
        
        $bookings = auth()->user()->bookings()->find($request->booking_id);
        $bookings->delete();
        return response()->json(['success'=>true,'process'=>'delete'],201);
    }
}
